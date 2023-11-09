import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits, Message, Partials } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { DiscordConversationService } from '../../repositories/discord/discord-conversation/discord-conversation.service';
import { ConversationalChainService } from '../../services/chains/conversational-chain/conversational-chain.service';
import { RetrievalConversationalChainService } from '../../services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import {
  Bot,
  DiscordConversation,
  DiscordMessage,
  FullBot,
} from '@my-monorepo/shared';
import { CallbackManager } from 'langchain/callbacks';
import { BotService } from '../../repositories/bot/bot.service';
import { ChatHistoryBuilderService } from '../../services/chat-history-builder/chat-history-builder.service';
import { LLMResult } from 'langchain/schema';
import { BaseThirdPartyApp } from '../../models/base-third-party-app';
import { VectorStore } from 'langchain/vectorstores/base';
import { DiscordChatHistoryBuilder } from '../../models/chat-history-builder';
import { CallBackRecord } from '../../models/callback-record';

const DISCORD_MESSAGE_REQUEST_REGEX =
  /[ \t]*<@([a-zA-Z0-9]{1,20})>[ \t]+bot[ \t]+([a-zA-Z0-9-_]{1,20})[ \t]+(.*)/;

@Injectable()
export class DiscordAppService
  extends BaseThirdPartyApp
  implements OnModuleInit
{
  private readonly logger = new Logger(DiscordAppService.name);
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private discordConversationService: DiscordConversationService,
    protected conversationalChainService: ConversationalChainService,
    protected retrievalConversationalChainService: RetrievalConversationalChainService,
    private botService: BotService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {
    super(
      conversationalChainService,
      retrievalConversationalChainService,
      null,
    );
  }

  onModuleInit() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Message, Partials.Channel],
    });
    this.client.once('ready', () => {
      this.logger.log('Bot is Ready!');
    });

    this.client.on('messageCreate', (message: Message) =>
      this.onMessageCreate(message).catch((error) => {
        this.logger.error(error);
        message.channel.send('Something went wrong! ' + error.message);
      }),
    );

    this.client.login(this.configService.get('DISCORD_BOT_TOKEN'));
  }

  private async onMessageCreate(message: Message): Promise<void> {
    const parsedMessage = this.parseMessage(message.content);
    if (
      !parsedMessage ||
      parsedMessage.mentioned !== this.client.user.id ||
      this.client.user.id === message.author.id
    )
      return;

    const bot = await this.botService.getBotByName(parsedMessage.bot);
    if (!bot) {
      this.logger.error(`Bot ${parsedMessage.bot} does not exist`);
      message.channel.send(
        `Bot ${parsedMessage.bot} is not available, please check the bot name and try again! 1`,
      );
      return;
    }
    const discordIntegration = bot.configuration.thirdPartyIntegration.discord;
    if (!discordIntegration) {
      this.logger.error(`Bot ${parsedMessage.bot} is not integrated`);
      message.channel.send(
        `Bot ${parsedMessage.bot} is not available, please check the bot name and try again! 2`,
      );
      return;
    }
    if (
      discordIntegration.isPrivate &&
      !discordIntegration.allowedChannels.includes(message.channel.id)
    ) {
      this.logger.error(
        `Bot ${parsedMessage.bot} is not available for this channel`,
      );
      message.channel.send(
        `Bot ${parsedMessage.bot} is not available, please check the bot name and try again! 3`,
      );
      return;
    }
    await this.discordConversationService.saveMessage(
      this.mapHumanMessage(message),
    );
    const postMessage = await message.channel.send('Thinking...');
    const conversation =
      await this.discordConversationService.getConversationById(
        message.channel.id,
      );
    const callbacks: CallBackRecord = {
      lm: CallbackManager.fromHandlers({
        handleLLMEnd: this.handleLLMEnd(bot, postMessage),
      }),
      retrievalLm: CallbackManager.fromHandlers({}),
      conversationalLm: CallbackManager.fromHandlers({
        handleLLMEnd: this.handleLLMEnd(bot, postMessage),
      }),
    };

    const vectorStore: VectorStore = await this.getVectorStore(bot);
    const llms = this.getLLMRecord(callbacks, bot.configuration, bot.creator);
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
      question: parsedMessage.question,
      chat_history: this.chatHistoryBuilder.buildFromDiscord(
        conversation.chatHistory,
      ),
    });
  }

  private handleLLMEnd(
    bot: Bot,
    message: Message,
  ): (result: LLMResult) => Promise<void> {
    const parsedMessage = this.parseMessage(message.content);
    return async (result: LLMResult) => {
      if (result.generations[0][0]?.text) {
        message.edit(result.generations[0][0]?.text).then(async (message) => {
          await this.discordConversationService.saveMessage({
            content: result.generations[0][0]?.text,
            discordConversationId: message.channel.id,
            botId: bot.id,
            isBot: true,
            authorId: message.author.id,
            username: parsedMessage.bot,
            createdAt: message.createdAt,
            id: message.id,
          });
        });
      }
    };
  }

  private mapHumanMessage(message: Message): DiscordMessage {
    const parsedMessage = this.parseMessage(message.content);
    return {
      id: message.id,
      createdAt: message.createdAt,
      content: parsedMessage.bot + ' ' + parsedMessage.question,
      isBot: false,
      authorId: message.author.id,
      username: message.author.username,
      discordConversationId: message.channel.id,
      botId: null,
    };
  }

  private parseMessage(content: string): {
    mentioned: string;
    bot: string;
    question: string;
  } {
    const match = DISCORD_MESSAGE_REQUEST_REGEX.exec(content);

    if (match) {
      return {
        mentioned: match[1],
        bot: match[2],
        question: match[3],
      };
    } else {
      return null;
    }
  }
}
