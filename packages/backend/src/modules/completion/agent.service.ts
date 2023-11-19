import { Injectable, Logger } from '@nestjs/common';
import { AgentService as AgentBuilderService } from '../../services/chains/agent/agent.service';
import {
  Bot,
  BotType,
  Conversation,
  InternalServerException,
  NewMessage,
} from '@my-monorepo/shared';
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
    if (bot.type !== BotType.AGENT) {
      throw new InternalServerException('Bot is not an agent');
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
    });

    const chain = this.agent.fromConversation(conversation, callbackManager);

    const chainValues = await chain.invoke(
      {
        question,
        chat_history: this.chatHistoryBuilder.build(conversation.chatHistory),
      },
      callbackManager,
    );
    subscriber.next({
      content: chainValues.output,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });
  }
}
