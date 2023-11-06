import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { ChatMessageHistory } from 'langchain/memory';
import { SystemChatMessage } from 'langchain/schema';
import { DiscordMessage, SlackMessage } from '@my-monorepo/shared';
import { ChatMessage } from '../../models/chat-message';

@Injectable()
export class ChatHistoryBuilderService {
  build(chatHistory: Message[]): ChatMessageHistory {
    const messages = chatHistory.map((message) => {
      switch (message.fromType) {
        case 'system':
          return new SystemChatMessage(message.content);
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

  buildFromDiscord(chatHistory: DiscordMessage[]): ChatMessageHistory {
    const messages = chatHistory.map((message) => {
      switch (message.isBot) {
        case false:
          return ChatMessage.createHumanMessage(
            message.content,
            message.username,
          );
        case true:
          return ChatMessage.createAIMessage(message.content, message.username);
        default:
          throw new Error('Message type not supported');
      }
    });
    return new ChatMessageHistory(messages);
  }

  buildFromSlack(chatHistory: SlackMessage[]): ChatMessageHistory {
    const messages = chatHistory.map((message) => {
      switch (message.isBot) {
        case false:
          return ChatMessage.createHumanMessage(
            message.content,
            message.username,
          );
        case true:
          return ChatMessage.createAIMessage(message.content, message.username);
        default:
          throw new Error('Message type not supported');
      }
    });
    return new ChatMessageHistory(messages);
  }
}
