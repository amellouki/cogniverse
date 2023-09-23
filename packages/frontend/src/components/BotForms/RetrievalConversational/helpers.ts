import {InputType} from "./form.schema";
import {BOT_CONFIG_VERSION_LATEST, NewBot, BotAvatarType, BotType} from "@my-monorepo/shared";

export function getNewBot(data: InputType): NewBot {
  return {
    name: data.name,
    description: data.description ?? null,
    type: BotType.RETRIEVAL_CONVERSATIONAL,
    configVersion: BOT_CONFIG_VERSION_LATEST,
    configuration: {
      name: data.name,
      version: BOT_CONFIG_VERSION_LATEST,
      type: BotType.RETRIEVAL_CONVERSATIONAL,
      description: data.description ?? '',
      avatar: {
        type: BotAvatarType.BOT_AVATAR_EMOTE,
        backgroundColor: data.color,
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
      },
      thirdPartyIntegration: {
        discord: data.integrateWithDiscord && data.discordChannelIds ? {
          isPrivate: true,
          allowedChannels: data.discordChannelIds,
        } : undefined,
      }
    },
    boundDocumentId: data.isBoundToDocument ? data.boundDocumentId ?? null : null,
    public: data.isPublic,
  }
}
