import {Bot as PrismaBot, LanguageModel} from '@prisma/client'
type Bot = PrismaBot & {
  conversationModel: LanguageModel
  retrievalLanguageModel: LanguageModel
}

export default Bot;
