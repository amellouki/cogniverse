import {Message, RCConversation as PrismaRCConversation} from '@prisma/client';
import {DocumentMetadata} from "./document-metadata";
import {Bot} from "./bot";

type RCConversation = PrismaRCConversation & {
  document: DocumentMetadata
  chatHistory: Message[]
  rcAgent: Bot
}

export default RCConversation;
