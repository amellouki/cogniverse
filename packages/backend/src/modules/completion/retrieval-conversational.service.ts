import { Injectable, Logger } from '@nestjs/common';
import { CallbackManager } from 'langchain/callbacks';
import { NewMessage } from '@my-monorepo/shared';
import { Conversation } from '@my-monorepo/shared';
import { BotType } from '@my-monorepo/shared';
import { Observable, share, Subscriber } from 'rxjs';
import { RetrievalConversationalChainService } from '../../services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import { ChatHistoryBuilderService } from '../../services/chat-history-builder/chat-history-builder.service';

@Injectable()
export class RetrievalConversationalService {
  logger = new Logger(RetrievalConversationalService.name);

  constructor(
    private retrievalConversationalChainService: RetrievalConversationalChainService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {}

  getCompletion$(question: string, conversation: Conversation) {
    return new Observable<NewMessage | { type: 'error'; payload: Error }>(
      (subscriber) => {
        this.getCompletion(question, conversation, subscriber)
          .then(() => subscriber.complete())
          .catch((e) => {
            subscriber.next({
              type: 'error',
              payload: e,
            });
          });
      },
    ).pipe(share());
  }

  async getCompletion(
    question: string,
    conversation: Conversation,
    subscriber: Subscriber<NewMessage>,
  ) {
    const bot = conversation.bot;
    if (bot.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not a retrieval conversational');
    }

    const retrievalCallbackManager: CallbackManager =
      CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          subscriber.next({
            content: token,
            conversationId: conversation.id,
            fromType: 'ai',
            type: 'retrieval-token',
            fromId: conversation.bot.id,
          });
        },
        handleLLMEnd: async (chainValues) => {
          if (chainValues.generations[0][0]?.text) {
            const message: NewMessage = {
              content: chainValues.generations[0][0]?.text,
              conversationId: conversation.id,
              fromType: 'ai',
              type: 'idea',
              fromId: conversation.bot.id,
            };
            subscriber.next(message);
          }
        },
      });

    const conversationalCallbackManager: CallbackManager =
      CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          subscriber.next({
            content: token,
            conversationId: conversation.id,
            fromType: 'ai',
            type: 'response-token',
            fromId: bot.id,
          });
        },
      });

    const chain =
      await this.retrievalConversationalChainService.fromConversation(
        question,
        conversation,
        retrievalCallbackManager,
        conversationalCallbackManager,
      );

    const chainValues = await chain.call({
      question,
      chat_history: this.chatHistoryBuilder.build(conversation.chatHistory),
    });

    subscriber.next({
      content: chainValues.text,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });
  }
}
