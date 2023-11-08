import { DiscordMessage } from '@my-monorepo/shared';
import { ChatMessageHistory } from 'langchain/memory';
import { ChatMessage } from '../chat-message';
import { BaseChatHistoryBuilder } from './base-chat-history-builder';

export class DiscordChatHistoryBuilder extends BaseChatHistoryBuilder<DiscordMessage> {
  build(chatHistory: DiscordMessage[]): ChatMessageHistory {
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
