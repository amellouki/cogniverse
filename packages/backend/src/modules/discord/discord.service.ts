import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits, Message, Partials } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { DiscordConversationService } from '../../repositories/discord/discord-conversation/discord-conversation.service';
import { ConversationalChainService } from '../../services/chains/conversational-chain/conversational-chain.service';
import { RetrievalConversationalChainService } from '../../services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import {
  Bot,
  BotType,
  DiscordConversation,
  DiscordMessage,
} from '@my-monorepo/shared';
import { CallbackManager } from 'langchain/callbacks';
import { BotService } from '../../repositories/bot/bot.service';
import { ChatHistoryBuilderService } from '../../services/chat-history-builder/chat-history-builder.service';

const DISCORD_MESSAGE_REQUEST_REGEX =
  /<@([a-zA-Z0-9]{1,20})> -bot ([a-zA-Z0-9]{1,20}) (.*)/;

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly logger = new Logger(DiscordService.name);
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private discordConversationService: DiscordConversationService,
    private conversationalChainService: ConversationalChainService,
    private retrievalConversationalChainService: RetrievalConversationalChainService,
    private botService: BotService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {}

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
      this.onMessageCreate(message),
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

    await this.discordConversationService.saveMessage(
      this.mapHumanMessage(message),
    );
    const conversation =
      await this.discordConversationService.getConversationById(
        message.channel.id,
      );
    const bot = await this.botService.getBotByName(parsedMessage.bot);
    if (!bot) {
      this.logger.error(`Bot ${parsedMessage.bot} not found`);
      message.channel.send(`Bot ${parsedMessage.bot} not found`);
      return;
    }
    const chain = await this.getChain(conversation, bot, message);
    await chain.call({
      question: parsedMessage.question,
      chat_history: this.chatHistoryBuilder.buildFromDiscord(
        conversation.chatHistory,
      ),
    });
  }

  private async getChain(
    conversation: DiscordConversation,
    bot: Bot,
    message: Message,
  ) {
    switch (bot.type) {
      case BotType.CONVERSATIONAL:
        return this.getConversationalChain(conversation, bot, message);
      case BotType.RETRIEVAL_CONVERSATIONAL:
        return await this.getRetrievalConversationalChain(
          conversation,
          bot,
          message,
        );
      default:
        throw new Error('Bot type not supported');
    }
  }

  private getConversationalChain(
    conversation: DiscordConversation,
    bot: Bot,
    message: Message,
  ) {
    return this.conversationalChainService.fromDiscordConversation(
      conversation,
      bot,
      CallbackManager.fromHandlers({
        handleLLMEnd: async (result) => {
          if (result.generations[0][0]?.text) {
            message.channel
              .send(result.generations[0][0]?.text)
              .then(async (message) => {
                await this.discordConversationService.saveMessage({
                  content: result.generations[0][0]?.text,
                  discordConversationId: message.channel.id,
                  botId: bot.id,
                  isBot: true,
                  authorId: message.author.id,
                  username: message.author.username,
                  createdAt: message.createdAt,
                  id: message.id,
                });
              });
          }
        },
      }),
    );
  }

  private getRetrievalConversationalChain(
    conversation: DiscordConversation,
    bot: Bot,
    message: Message,
  ) {
    return this.retrievalConversationalChainService.fromDiscordConversation(
      conversation,
      bot,
      CallbackManager.fromHandlers({}),
      CallbackManager.fromHandlers({
        handleLLMEnd: async (result) => {
          if (result.generations[0][0]?.text) {
            message.channel
              .send(result.generations[0][0]?.text)
              .then(async (message) => {
                await this.discordConversationService.saveMessage({
                  content: result.generations[0][0]?.text,
                  discordConversationId: message.channel.id,
                  botId: bot.id,
                  isBot: true,
                  authorId: message.author.id,
                  username: message.author.username,
                  createdAt: message.createdAt,
                  id: message.id,
                });
              });
          }
        },
      }),
    );
  }

  private mapHumanMessage(message: Message): DiscordMessage {
    return {
      id: message.id,
      createdAt: message.createdAt,
      content: message.content,
      isBot: true,
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
