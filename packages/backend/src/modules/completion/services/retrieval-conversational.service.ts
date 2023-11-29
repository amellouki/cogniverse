import { Injectable, Logger } from '@nestjs/common';
import { CallbackManager } from 'langchain/callbacks';
import { NewMessage } from '@my-monorepo/shared';
import { Conversation } from '@my-monorepo/shared';
import { BotType } from '@my-monorepo/shared';
import { Subject } from 'rxjs';
import { RetrievalConversationalChainService } from 'src/services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import { ChatHistoryBuilderService } from 'src/services/chat-history-builder/chat-history-builder.service';
import { BaseChainStream } from 'src/modules/completion/services/base-chain-stream';

@Injectable()
export class RetrievalConversationalService extends BaseChainStream {
  logger = new Logger(RetrievalConversationalService.name);

  constructor(
    private retrievalConversationalChainService: RetrievalConversationalChainService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {
    super();
  }

  async getCompletion(
    question: string,
    conversation: Conversation,
    subject: Subject<NewMessage>,
  ) {
    const bot = conversation.bot;
    if (bot.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not a retrieval conversational');
    }

    const retrievalCallbackManager: CallbackManager =
      CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          subject.next({
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
            subject.next(message);
          }
        },
      });

    const conversationalCallbackManager: CallbackManager =
      CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          subject.next({
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

    subject.next({
      content: chainValues.text,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });
  }
}
