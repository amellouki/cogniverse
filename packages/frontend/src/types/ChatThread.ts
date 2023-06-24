export type Message = {
  id: number;
  content: string;
  type: string;
  fromId: number;
  fromType: string;
  conversationId: number;
}

export type Conversation = {
  id: number;
  ChatHistory: Message[];
  conversationModel: LanguageModel;
  retrievalLanguageModel: LanguageModel;
}

export type LanguageModel = {
  id: number;
  name: string;
  type: string;
  prompt: string;
}

export type ConversationItem = {
  id: number;
  conversationModelId: number;
  retrievalLanguageModelId: number;
  title: string;
}
