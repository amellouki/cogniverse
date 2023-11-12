import { Injectable, Logger } from '@nestjs/common';
import {
  App,
  directMention,
  ExpressReceiver,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { Bot, SlackMessage } from '@my-monorepo/shared';
import { LLMResult } from 'langchain/schema';
import { SlackService as SlackRepository } from '../../repositories/slack/slack.service';
import { CallbackManager } from 'langchain/callbacks';
import { RetrievalConversationalChainService } from '../../services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import { ConversationalChainService } from '../../services/chains/conversational-chain/conversational-chain.service';
import { BotService } from '../../repositories/bot/bot.service';
import { ChatHistoryBuilderService } from '../../services/chat-history-builder/chat-history-builder.service';
import { CallBackRecord } from '../../models/callback-record';
import { VectorStore } from 'langchain/vectorstores/base';
import { VectorStoreService } from '../../services/vector-store/vector-store.service';
import { SlackChatHistoryBuilder } from '../../models/chat-history-builder';
import { BaseThirdPartyApp } from '../../models/base-third-party-app';

const SLACK_MESSAGE_REQUEST_REGEX =
  /[ \t]*<@([a-zA-Z0-9]{1,20})>[ \t]*bot[ \t]+([a-zA-Z0-9-_]{1,20})[ \t]+(.*)/;
@Injectable()
export class SlackAppService extends BaseThirdPartyApp {
  private logger = new Logger(SlackAppService.name);

  readonly app: App;
  readonly receiver: ExpressReceiver;

  constructor(
    private readonly configService: ConfigService,
    protected conversationalChainService: ConversationalChainService,
    protected retrievalConversationalChainService: RetrievalConversationalChainService,
    protected vectorStoreService: VectorStoreService,
    private slackRepository: SlackRepository,
    private botService: BotService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {
    super(
      conversationalChainService,
      retrievalConversationalChainService,
      vectorStoreService,
    );
    try {
      this.receiver = new ExpressReceiver({
        signingSecret: this.configService.get('SLACK_SIGNING_SECRET'),
        endpoints: {
          events: `/`,
        },
      });

      this.app = new App({
        token: this.configService.get('SLACK_BOT_TOKEN'),
        receiver: this.receiver,
      });

      this.initializeListeners();
    } catch (e) {
      this.logger.error(e);
    }
  }

  private initializeListeners() {
    this.app.message(directMention(), async (args) => {
      await this.onMessageCreate(args);
    });
  }

  // Function to attach Bolt receiver to an existing Express app
  public attachToExpress(expressApp: Express) {
    if (!this.receiver) {
      this.logger.error('Slack receiver not initialized');
      return;
    }
    expressApp.use('/slack/events', this.receiver.router);
    this.logger.log('Slack receiver attached to Express app');
  }

  private async onMessageCreate(
    args: SlackEventMiddlewareArgs<'message'>,
  ): Promise<void> {
    const { message, say } = args;
    if (!('text' in message)) {
      return;
    }
    const parsedMessage = this.parseMessage(message.text);
    if (!parsedMessage) {
      this.logger.error(`Message not formatted correctly`);
      await say(`Please format your message correctly!`);
      return;
    }
    const bot = await this.botService.getBotByName(parsedMessage.bot);
    if (!bot) {
      this.logger.error(`Bot ${parsedMessage.bot} does not exist`);
      await say(
        `Bot ${parsedMessage.bot} is not available, please check the bot name and try again! #1`,
      );
      return;
    }
    const slackIntegration = bot.configuration.thirdPartyIntegration.slack;
    if (!slackIntegration) {
      this.logger.error(`Bot ${parsedMessage.bot} is not integrated`);
      await say(
        `Bot ${parsedMessage.bot} is not available, please check the bot name and try again! #2`,
      );
      return;
    }
    if (!slackIntegration.allowedChannels.includes(message.channel)) {
      this.logger.error(
        `Bot ${parsedMessage.bot} is not available for this channel`,
      );
      await say(
        `Bot ${parsedMessage.bot} is not available, please check the bot name and try again! #3`,
      );
      return;
    }
    const { ts } = await say('Generating...');

    await this.slackRepository.saveMessage(await this.mapHumanMessage(args));
    const conversation = await this.slackRepository.getConversationById(
      message.channel,
    );
    const callbacks: CallBackRecord = {
      lm: CallbackManager.fromHandlers({
        handleLLMEnd: this.handleLLMEnd(bot, ts, args),
      }),
      retrievalLm: CallbackManager.fromHandlers({}),
      conversationalLm: CallbackManager.fromHandlers({
        handleLLMEnd: this.handleLLMEnd(bot, ts, args),
      }),
    };

    const vectorStore: VectorStore = await this.getVectorStore(bot);
    const llms = this.getLLMRecord(callbacks, bot.configuration, bot.creator);
    const chatHistory = this.getHistory(
      new SlackChatHistoryBuilder(),
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
      chat_history: this.chatHistoryBuilder.buildFromSlack(
        conversation.chatHistory,
      ),
    });
  }

  private handleLLMEnd(
    bot: Bot,
    ts: string,
    { message }: SlackEventMiddlewareArgs<'message'>,
  ): (result: LLMResult) => Promise<void> {
    return async (result: LLMResult) => {
      if (result.generations[0][0]?.text) {
        this.app.client.chat
          .update({
            ts: ts,
            channel: message.channel,
            text: result.generations[0][0]?.text,
          })
          .then(async (postMessage) => {
            await this.slackRepository.saveMessage({
              content: result.generations[0][0]?.text,
              slackConversationId: postMessage.channel,
              botId: bot.id,
              isBot: true,
              authorId: postMessage.message.user,
              username: bot.name,
              createdAt: new Date(parseFloat(ts) * 1000),
              id: ts,
            });
          });
      }
    };
  }

  private async getUsername(userId: string) {
    const result = await this.app.client.users.info({
      token: this.configService.get('SLACK_BOT_TOKEN'),
      user: userId,
    });
    return result.user.name;
  }

  private async mapHumanMessage({
    message,
  }: SlackEventMiddlewareArgs<'message'>): Promise<SlackMessage> {
    if (
      !('text' in message) ||
      !('user' in message) ||
      !('client_msg_id' in message)
    ) {
      this.logger.error('Type error');
      throw new Error('Type error');
    }
    const parsedMessage = this.parseMessage(message.text);
    const username = await this.getUsername(message.user);

    return {
      id: message.ts,
      createdAt: new Date(parseFloat(message.ts) * 1000),
      content: parsedMessage.bot + ' ' + parsedMessage.question,
      isBot: false,
      authorId: message.user,
      username,
      slackConversationId: message.channel,
      botId: null,
    };
  }

  private parseMessage(content: string): {
    mentioned: string;
    bot: string;
    question: string;
  } {
    const match = SLACK_MESSAGE_REQUEST_REGEX.exec(content);

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
