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

    const chain = this.agent.fromConversation(
      conversation,
      callbackManager,
      toolsCallbackManager,
    );

    const chainValues = await chain.invoke({
      question,
      chat_history: this.chatHistoryBuilder.build(conversation.chatHistory),
    });
    subject.next({
      content: chainValues.output,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });
  }
}
