import {InputType} from "./form.schema";
import {NewBot} from "@my-monorepo/shared/dist/types/bot"
import NewLlm from "@my-monorepo/shared/src/types/new-llm"
import {BOT_CONFIG_VERSION_LATEST} from "@my-monorepo/shared/dist/constants";
import BotType from "../../../../../shared/src/types/bot/bot-type";
import {BotAvatarType} from "@my-monorepo/shared/dist/types/bot/bot-avatar-type";

export function getNewBot(data: InputType): NewBot {
  const retrievalLanguageModel: NewLlm | undefined = data.isRLMCustomPrompt && data.rlmPrompt ? {
    prompt: data.rlmPrompt,
    name: "Retrieval model",
    type: "retrieval-model",
  } : undefined
  const conversationModel: NewLlm | undefined = data.isCLMCustomPrompt && data.clmPrompt ? {
    prompt: data.clmPrompt,
    name: "Conversation model",
    type: "conversation-model",
  } : undefined

  return {
    name: data.name,
    retrievalLanguageModel,
    conversationModel,
    description: "[TODO]",
    type: BotType.RETRIEVAL_CONVERSATIONAL,
    configVersion: BOT_CONFIG_VERSION_LATEST,
    configuration: {
      name: data.name,
      version: BOT_CONFIG_VERSION_LATEST,
      type: BotType.RETRIEVAL_CONVERSATIONAL,
      description: "[TODO]",
      avatar: {
        type: BotAvatarType.BOT_AVATAR_IMAGE,
        url: 'https://picsum.photos/200',
      },
      retrievalLm: {
        modelName: '[TODO]gpt3.5',
        prompt: data.rlmPrompt,
        apiKey: '[TODO]1234',
      },
      conversationalLm: {
        modelName: '[TODO]gpt3.5',
        prompt: data.clmPrompt,
        apiKey: '[TODO]1234',
      }
    }
  }
}
