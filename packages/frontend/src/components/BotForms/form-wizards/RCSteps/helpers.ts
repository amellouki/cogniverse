import {InputType} from "./form.schema";
import {BOT_CONFIG_VERSION_LATEST, NewBot, BotAvatarType, BotType} from "@my-monorepo/shared";

export function getNewBot(data: InputType): NewBot {
  const {botInfo, botConfig, integration} = data;
  return {
    name: botInfo.name,
    description: botInfo.description ?? null,
    type: BotType.RETRIEVAL_CONVERSATIONAL,
    configVersion: BOT_CONFIG_VERSION_LATEST,
    configuration: {
      name: botInfo.name,
      version: BOT_CONFIG_VERSION_LATEST,
      type: BotType.RETRIEVAL_CONVERSATIONAL,
      description: botInfo.description ?? '',
      avatar: {
        type: BotAvatarType.BOT_AVATAR_EMOTE,
        backgroundColor: botInfo.color,
      },
      retrievalLm: {
        modelName: botConfig.rLlm,
        prompt: botConfig.rlmPrompt,
        apiKey: botConfig.rApiKey,
      },
      conversationalLm: {
        modelName: botConfig.cLlm,
        prompt: botConfig.clmPrompt,
        apiKey: botConfig.cApiKey,
      },
      thirdPartyIntegration: {
        discord: integration.integrateWithDiscord && integration.discordChannelIds ? {
          isPrivate: true,
          allowedChannels: integration.discordChannelIds,
        } : undefined,
      }
    },
    boundDocumentId: botInfo.isBoundToDocument ? botInfo.boundDocumentId ?? null : null,
    public: botInfo.isPublic,
  }
}
