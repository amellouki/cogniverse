import {RCAgent as PrismaRCAgent, LanguageModel} from '@prisma/client'
type RCAgent = PrismaRCAgent & {
  conversationModel: LanguageModel
  retrievalLanguageModel: LanguageModel
}

export default RCAgent;
