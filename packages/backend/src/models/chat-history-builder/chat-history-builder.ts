import { Message } from '@prisma/client';
import { ChatMessageHistory } from 'langchain/memory';
import { SystemMessage } from 'langchain/schema';
import { ChatMessage } from '../chat-message';
import { BaseChatHistoryBuilder } from './base-chat-history-builder';

export class ChatHistoryBuilder extends BaseChatHistoryBuilder<Message> {
  build(chatHistory: Message[]): ChatMessageHistory {
    const messages = chatHistory.map((message) => {
      switch (message.fromType) {
        case 'system':
          return new SystemMessage(message.content);
        case 'ai':
          return ChatMessage.createAIMessage(message.content);
        case 'human':
          return ChatMessage.createHumanMessage(message.content, '');
        default:
          throw new Error('Message type not supported');
      }
    });
    return new ChatMessageHistory(messages);
  }
}
