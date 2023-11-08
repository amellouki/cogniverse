import { ChatMessageHistory } from 'langchain/memory';

export abstract class BaseChatHistoryBuilder<MessageType> {
  abstract build(chat: MessageType[]): ChatMessageHistory;
}
