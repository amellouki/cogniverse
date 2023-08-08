import {Message, RCConversation as PrismaRCConversation} from '@prisma/client';
import {DocumentMetadata} from "./document-metadata";
import {Bot} from "./bot";

export type RCConversation = PrismaRCConversation & {
  document: DocumentMetadata
  chatHistory: Message[]
  rcAgent: Bot
}
