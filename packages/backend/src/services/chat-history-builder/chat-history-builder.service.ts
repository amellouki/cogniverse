import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { ChatMessageHistory } from 'langchain/memory';
import { SystemChatMessage } from 'langchain/schema';
import {
  DiscordMessage,
  MessageTypeNotSupportedException,
  SlackMessage,
} from '@my-monorepo/shared';
import { ChatMessage } from 'src/lib/chat-message';

@Injectable()
export class ChatHistoryBuilderService {
  build(chatHistory: Message[]): ChatMessageHistory {
    const messages = chatHistory.map((message) => {
      switch (message.fromType) {
        case 'system':
          return ChatMessage.createSystemMessage(message.content);
        case 'ai':
          if (message.type === 'ui') {
            // TODO: temp abomination
            return ChatMessage.createAIMessage(
              JSON.parse(message.content)
                ?.payload?.options?.map((x) => x.value)
                .join(','),
            );
          } else if (message.type === 'generated_image') {
            console.log('created AI message: generated image');
            return ChatMessage.createAIMessage('[generated image]');
          } else {
            return ChatMessage.createAIMessage(message.content);
          }
        case 'human':
          return ChatMessage.createHumanMessage(message.content, '');
        default:
          throw new MessageTypeNotSupportedException();
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
          throw new MessageTypeNotSupportedException();
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
          throw new MessageTypeNotSupportedException();
      }
    });
    return new ChatMessageHistory(messages);
  }
}
