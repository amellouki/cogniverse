import { Prisma } from '@prisma/client';

const languageModel = Prisma.validator<Prisma.LanguageModelArgs>()({
  select: {
    name: true,
    type: true,
    prompt: true,
  },
});

const conversationWithModels = Prisma.validator<Prisma.ConversationArgs>()({
  select: {
    retrievalLanguageModel: languageModel,
    conversationModel: languageModel,
    title: true,
  },
});

type CreateConversationRequestDto = Prisma.ConversationGetPayload<
  typeof conversationWithModels
>;

export default CreateConversationRequestDto;
