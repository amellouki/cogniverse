import {Message as PrismaMessage, DocumentMetadata} from "@prisma/client";

export type Message = PrismaMessage

export type Conversation = {
  id: number;
  chatHistory: Message[];
  document: DocumentMetadata;
}

export type ConversationItem = {
  id: number;
  title: string;
}
