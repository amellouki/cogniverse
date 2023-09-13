import { BaseChatMessage, MessageType } from 'langchain/schema';

export class ChatMessage extends BaseChatMessage {
  private constructor(
    text: string,
    name: string | undefined,
    readonly type: MessageType,
  ) {
    super(text);
    this.text = text;
    this.name = name;
  }
  _getType(): MessageType {
    return this.type;
  }

  getRow(): string {
    if (this.type === 'human') {
      return `Human${this.name ? ' ' + this.name : ''}: ${this.text}`;
    }
    if (this.type === 'ai') {
      return `AI Assistant${this.name ? ' ' + this.name : ''}: ${this.text}`;
    }
    return this.text;
  }

  static createHumanMessage(text: string, name: string): ChatMessage {
    return new ChatMessage(text, name, 'human');
  }

  static createAIMessage(text: string, name?: string): ChatMessage {
    return new ChatMessage(text, name, 'ai');
  }

  static createSystemMessage(text: string): ChatMessage {
    return new ChatMessage(text, undefined, 'system');
  }

  static getChatHistoryString(chatHistory: ChatMessage[]): string {
    if (Array.isArray(chatHistory)) {
      return chatHistory.map((message) => message.getRow()).join('\n');
    }
    throw new Error('Chat history is not an array');
  }
}
