import { Injectable, Logger } from '@nestjs/common';
import { AgentService as AgentBuilderService } from '../../services/chains/agent/agent.service';
import { Bot, BotType, Conversation, NewMessage } from '@my-monorepo/shared';
import { Observable, share, Subscriber } from 'rxjs';
import { CallbackManager } from 'langchain/callbacks';
import { ChatHistoryBuilderService } from '../../services/chat-history-builder/chat-history-builder.service';

@Injectable()
export class AgentService {
  logger = new Logger(AgentService.name);

  constructor(
    private agent: AgentBuilderService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {}

  getCompletion$(question: string, conversation: Conversation) {
    return new Observable<NewMessage | { type: 'error'; payload: Error }>(
      (subscriber) => {
        this.getCompletion(question, conversation, subscriber)
          .catch((e) => {
            subscriber.next({
              type: 'error',
              payload: e,
            });
          })
          .finally(() => subscriber.complete());
      },
    ).pipe(share());
  }

  async getCompletion(
    question: string,
    conversation: Conversation,
    subscriber: Subscriber<NewMessage>,
  ) {
    const bot = conversation.bot as Bot;
    if (bot.type !== BotType.CONVERSATIONAL) {
      throw Error('Bot is not of the Conversational type');
    }

    const callbackManager: CallbackManager = CallbackManager.fromHandlers({
      handleLLMNewToken: (token) => {
        subscriber.next({
          content: token,
          conversationId: conversation.id,
          fromType: 'ai',
          type: 'response-token',
          fromId: conversation.bot.id,
        });
      },
      handleToolStart(
        tool,
        input: string,
        runId: string,
        parentRunId?: string,
        tags?: string[],
        metadata?: Record<string, unknown>,
        name?: string,
      ): any {
        console.log(
          'handleToolStart',
          tool,
          input,
          runId,
          parentRunId,
          tags,
          metadata,
          name,
        );
      },
      handleChainStart(): any {
        console.log('handleChainStart');
      },
      handleChainEnd(): any {
        console.log('handleChainEnd');
      },
    });

    const chain = await this.agent.fromConversation(
      conversation,
      callbackManager,
    );

    const chainValues = await chain.invoke(
      {
        question,
        chat_history: this.chatHistoryBuilder.build(conversation.chatHistory),
      },
      callbackManager,
    );
    console.log('chainValues', JSON.stringify(chainValues, null, 2));
    subscriber.next({
      content: chainValues.output,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });
  }
}
