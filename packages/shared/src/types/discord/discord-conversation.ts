import { DiscordConversation as PrismaDiscordConversation } from '@prisma/client'
import {DiscordMessage} from "./discord-message";

export type DiscordConversation = PrismaDiscordConversation & {
  chatHistory: DiscordMessage[]
}
