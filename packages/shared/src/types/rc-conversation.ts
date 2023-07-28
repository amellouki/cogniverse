import {Message, RCConversation as PrismaRCConversation} from '@prisma/client';
import {DocumentMetadata} from "./document-metadata";
import RCAgent from "./rc-agent";

type RCConversation = PrismaRCConversation & {
  document: DocumentMetadata
  chatHistory: Message[]
  rcAgent: RCAgent
}

export default RCConversation;
