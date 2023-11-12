import { Injectable, Logger } from '@nestjs/common';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { BaseThirdPartyApp } from 'src/models/base-third-party-app';
import { ConversationalChainService } from 'src/services/chains/conversational-chain/conversational-chain.service';
import { RetrievalConversationalChainService } from 'src/services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import { VectorStoreService } from 'src/services/vector-store/vector-store.service';
import { BotService } from 'src/repositories/bot/bot.service';
import { DiscordConversationService } from 'src/repositories/discord/discord-conversation/discord-conversation.service';
import { Bot, DiscordMessage } from '@my-monorepo/shared';
import { CallBackRecord } from 'src/models/callback-record';
import { CallbackManager } from 'langchain/callbacks';
import { LLMResult } from 'langchain/schema';
import { VectorStore } from 'langchain/vectorstores/base';
import { DiscordChatHistoryBuilder } from 'src/models/chat-history-builder';
import { ICommand } from 'src/models/command';

@Injectable()
export class CvService extends BaseThirdPartyApp implements ICommand {
  private readonly logger = new Logger(CvService.name);
  constructor(
    protected conversationalChainService: ConversationalChainService,
    protected retrievalConversationalChainService: RetrievalConversationalChainService,
    protected vectorStoreService: VectorStoreService,
    private botService: BotService,
    private discordConversationService: DiscordConversationService,
  ) {
    super(
      conversationalChainService,
      retrievalConversationalChainService,
      vectorStoreService,
    );
  }

  data = new SlashCommandBuilder()
    .setName('cv')
    .setDescription('chat with your bots')
    .addStringOption((options) => {
      return options
        .setName('bot')
        .setDescription('Bot name')
        .setRequired(true);
    })
    .addStringOption((options) => {
      return options
        .setName('message')
        .setDescription('A message to send to the bot')
        .setRequired(true);
    });

  public async execute(interaction: ChatInputCommandInteraction) {
    try {
      this.validateCommand(interaction);
    } catch (e) {
      return await interaction.reply(e);
    }
    await interaction.deferReply();
    await this.discordConversationService.saveMessage(
      this.mapHumanMessage(interaction),
    );
    try {
      return await this.callChain(interaction);
    } catch (e) {
      return await interaction.followUp('Something went wrong ' + e.message);
    }
  }

  private async callChain(interaction: ChatInputCommandInteraction) {
    const messageText = interaction.options.getString('message');
    const [bot, conversation] = await Promise.all([
      this.getBot(interaction),
      this.discordConversationService.getConversationById(
        interaction.channel.id,
      ),
      interaction.editReply('**Responding to:**\n' + messageText),
    ]);
    const callbacks: CallBackRecord = {
      lm: CallbackManager.fromHandlers({
        handleLLMEnd: this.handleLLMEnd(bot, interaction),
      }),
      retrievalLm: CallbackManager.fromHandlers({}),
      conversationalLm: CallbackManager.fromHandlers({
        handleLLMEnd: this.handleLLMEnd(bot, interaction),
      }),
    };
    const llms = this.getLLMRecord(callbacks, bot.configuration, bot.creator);
    const vectorStore: VectorStore = await this.getVectorStore(bot);
    const chatHistory = this.getHistory(
      new DiscordChatHistoryBuilder(),
      conversation.chatHistory,
    );
    const chain = this.getChain(bot.type).build({
      llms,
      botConfig: bot.configuration,
      keys: bot.creator,
      vectorStore,
      chatHistory,
    });
    await chain.call({
      question: messageText,
    });
  }

  private handleLLMEnd(
    bot: Bot,
    interaction: ChatInputCommandInteraction,
  ): (result: LLMResult) => Promise<void> {
    return async (result: LLMResult) => {
      const generation = result.generations[0][0]?.text;
      if (generation) {
        const message = await interaction.followUp(generation);
        await this.discordConversationService.saveMessage({
          content: result.generations[0][0]?.text,
          discordConversationId: message.channel.id,
          botId: bot.id,
          isBot: true,
          authorId: message.author.id,
          username: bot.name,
          createdAt: message.createdAt,
          id: message.id,
        });
      }
    };
  }

  private validateCommand(interaction: ChatInputCommandInteraction) {
    const botName = interaction.options.getString('bot');
    const message = interaction.options.getString('message');
    if (!botName || !message) {
      throw new Error('Please provide a bot name and a message');
    }
  }

  private async getBot(interaction: ChatInputCommandInteraction) {
    const botName = interaction.options.getString('bot');
    const bot = await this.botService.getBotByName(botName);
    if (!bot) {
      throw new Error(`Bot ${botName} does not exist`);
    }
    const discordIntegration = bot.configuration.thirdPartyIntegration.discord;
    if (!discordIntegration) {
      throw new Error(`Bot ${botName} is not integrated`);
    }
    if (
      discordIntegration.isPrivate &&
      !discordIntegration.allowedChannels.includes(interaction.channel.id)
    ) {
      throw new Error(`Bot ${botName} is not available for this channel`);
    }
    return bot;
  }

  private mapHumanMessage(
    interaction: ChatInputCommandInteraction,
  ): DiscordMessage {
    const message = interaction.options.getString('message');
    const botName = interaction.options.getString('bot');
    return {
      id: interaction.id,
      createdAt: interaction.createdAt,
      content: botName + ' ' + message,
      isBot: false,
      authorId: interaction.user.id,
      username: interaction.user.username,
      discordConversationId: interaction.channel.id,
      botId: null,
    };
  }
}
