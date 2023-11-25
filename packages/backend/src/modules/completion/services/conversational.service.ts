import { Injectable, Logger } from '@nestjs/common';
import { ConversationalChainService } from 'src/services/chains/conversational-chain/conversational-chain.service';
import { Bot, BotType, Conversation, NewMessage } from '@my-monorepo/shared';
import { Subject } from 'rxjs';
import { CallbackManager } from 'langchain/callbacks';
import { ChatHistoryBuilderService } from 'src/services/chat-history-builder/chat-history-builder.service';
import { BaseChainStream } from 'src/modules/completion/services/base-chain-stream';

@Injectable()
export class ConversationalService extends BaseChainStream {
  logger = new Logger(ConversationalService.name);

  constructor(
    private conversationalChainService: ConversationalChainService,
    private chatHistoryBuilder: ChatHistoryBuilderService,
  ) {
    super();
  }

  protected async getCompletion(
    question: string,
    conversation: Conversation,
    subject: Subject<NewMessage>,
  ) {
    const bot = conversation.bot as Bot;
    if (bot.type !== BotType.CONVERSATIONAL) {
      throw Error('Bot is not of the Conversational type');
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

    const chain = this.conversationalChainService.fromConversation(
      conversation,
      callbackManager,
    );

    const chainValues = await chain.invoke({
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
