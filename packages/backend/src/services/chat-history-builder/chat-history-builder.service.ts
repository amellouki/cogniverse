import { Injectable } from '@nestjs/common';
import {Message} from "@prisma/client";
import {ChatMessageHistory} from "langchain/memory";
import {AIChatMessage, HumanChatMessage, SystemChatMessage} from "langchain/schema";
import {DiscordMessage} from "@my-monorepo/shared";

@Injectable()
export class ChatHistoryBuilderService {
  build(chatHistory: Message[]): ChatMessageHistory {
    const messages = chatHistory.map((message) => {
      switch (message.fromType) {
        case 'system':
          return new SystemChatMessage(message.content);
        case 'ai':
          return new AIChatMessage(message.content);
        case 'human':
          return new HumanChatMessage(message.content);
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
          return new HumanChatMessage(message.content);
        case true:
          return new AIChatMessage(message.content);
        default:
          throw new Error('Message type not supported');
      }
    });
    return new ChatMessageHistory(messages);
  }
}
