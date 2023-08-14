import {Message, Conversation as PrismaConversation} from '@prisma/client';
import {DocumentMetadata} from "./document-metadata";
import {Bot} from "./bot";

export type Conversation = PrismaConversation & {
  document?: DocumentMetadata
  chatHistory: Message[]
  bot: Bot
}
