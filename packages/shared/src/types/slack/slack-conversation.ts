import { SlackConversation as PrismaSlackConversation } from '@prisma/client'
import {SlackMessage} from "./slack-message";

export type SlackConversation = PrismaSlackConversation & {
  chatHistory: SlackMessage[]
}
