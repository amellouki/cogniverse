import {Message as PrismaMessage, DocumentMetadata} from "@prisma/client";

export type Message = PrismaMessage

export type Conversation = {
  id: number;
  ChatHistory: Message[];
  conversationModel: LanguageModel;
  retrievalLanguageModel: LanguageModel;
  document: DocumentMetadata;
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
