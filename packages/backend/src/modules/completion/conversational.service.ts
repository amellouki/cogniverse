import { Injectable, Logger } from '@nestjs/common';
import { ConversationalChainService } from '../../services/chains/conversational-chain/conversational-chain.service';
import { Bot, BotType, Conversation, NewMessage } from '@my-monorepo/shared';
import { Observable, share, Subscriber } from 'rxjs';
import { CallbackManager } from 'langchain/callbacks';
import { ChatHistoryBuilderService } from '../../services/chat-history-builder/chat-history-builder.service';
import {
  HandleLLMNewTokenCallbackFields,
  NewTokenIndices,
} from 'langchain/dist/callbacks/base';

@Injectable()
export class ConversationalService {
  logger = new Logger(ConversationalService.name);

  constructor(
    private conversationalChainService: ConversationalChainService,
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
    });

    const chain = await this.conversationalChainService.fromConversation(
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
      content: chainValues.text,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });
  }
}
