import { Injectable, Logger } from '@nestjs/common';
import { AgentService as AgentBuilderService } from 'src/services/chains/agent/agent.service';
import {
  Bot,
  BotType,
  Conversation,
  InternalServerException,
  NewMessage,
} from '@my-monorepo/shared';
import { Subject } from 'rxjs';
import { CallbackManager } from 'langchain/callbacks';
import { ChatHistoryBuilderService } from 'src/services/chat-history-builder/chat-history-builder.service';
import { BaseChainStream } from './base-chain-stream';
import { LLMResult } from 'langchain/schema';

@Injectable()
export class AgentService extends BaseChainStream {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    private agent: AgentBuilderService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {
    super();
  }

  async getCompletion(
    question: string,
    conversation: Conversation,
    subject: Subject<NewMessage>,
  ) {
    const bot = conversation.bot as Bot;
    if (bot.type !== BotType.AGENT) {
      throw new InternalServerException('Bot is not an agent');
    }

    const callbackManager: CallbackManager = CallbackManager.fromHandlers({
      handleLLMNewToken: (token) => {
        subject.next({
          content: token,
          conversationId: conversation.id,
          fromType: 'ai',
          type: 'response-token',
          fromId: conversation.bot.id,
        });
      },
      handleLLMEnd(output: LLMResult): any {
        if (!output.generations[0][0]?.text) {
          return;
        }
        subject.next({
          content: output.generations[0][0]?.text,
          conversationId: conversation.id,
          fromType: 'ai',
          type: 'message',
          fromId: bot.id,
        });
      },
    });

    const toolsCallbackManager = CallbackManager.fromHandlers({
      handleToolStart: (_, input: string) => {
        this.logger.log('handleToolStart', input, JSON.stringify(_, null, 2));
        subject.next({
          content: input,
          conversationId: conversation.id,
          fromType: 'ai',
          type: 'idea',
          fromId: bot.id,
        });
      },
      handleToolEnd(
        output: string,
        runId: string,
        parentRunId?: string,
        tags?: string[],
      ) {
        console.log('handleToolEnd', output, runId, parentRunId, tags);
      },
    });

    const dalleCallbackManager = CallbackManager.fromHandlers({
      handleToolStart: (_, input: string) => {
        console.log('handle dalle generation start');
        subject.next({
          content: 'generating image...',
          conversationId: conversation.id,
          fromType: 'ai',
          type: 'generating',
          fromId: bot.id,
        });
      },
    });

    const dalleCallback = (imageUrl: string) => {
      this.logger.log('generated_image: dalle callback');
      subject.next({
        content: imageUrl,
        conversationId: conversation.id,
        fromType: 'ai',
        type: 'generated_image',
        fromId: bot.id,
      });
    };

    const uiCallbacks = (ui: any) => {
      console.log('ui', ui);
      subject.next({
        content: ui,
        conversationId: conversation.id,
        fromType: 'ai',
        type: 'ui',
        fromId: bot.id,
      });
    };

    const chain = await this.agent.fromConversation(
      conversation,
      callbackManager,
      toolsCallbackManager,
      uiCallbacks,
      dalleCallbackManager,
      dalleCallback,
    );

    const chainValues = await chain.invoke({
      question,
    });

    console.log('chainValues', JSON.stringify(chainValues, null, 2));
    // subject.next({
    //   content: chainValues.output,
    //   conversationId: conversation.id,
    //   fromType: 'ai',
    //   type: 'message',
    //   fromId: bot.id,
    // });
  }
}
