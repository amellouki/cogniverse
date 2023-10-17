import {InputType} from "./form.schema";
import {BOT_CONFIG_VERSION_LATEST, NewBot, BotAvatarType, BotType} from "@my-monorepo/shared";

export function getNewBot(data: InputType): NewBot {
  const {botInfo, botConfig, integration} = data;
  return {
    name: botInfo.name,
    description: botInfo.description ?? null,
    type: BotType.CONVERSATIONAL,
    configVersion: BOT_CONFIG_VERSION_LATEST,
    configuration: {
      name: botInfo.name,
      version: BOT_CONFIG_VERSION_LATEST,
      type: BotType.CONVERSATIONAL,
      description: botInfo.description ?? '',
      avatar: {
        type: BotAvatarType.BOT_AVATAR_EMOTE,
        backgroundColor: botInfo.color,
      },
      lm: {
        modelName: botConfig.llm,
        prompt: botConfig.prompt,
        apiKey: botConfig.apiKey,
      },
      thirdPartyIntegration: {
        discord: integration.integrateWithDiscord && integration.discordChannelIds ? {
          isPrivate: true,
          allowedChannels: integration.discordChannelIds,
        } : undefined,
      }
    },
    boundDocumentId: null,
    public: botInfo.isPublic,
  }
}
