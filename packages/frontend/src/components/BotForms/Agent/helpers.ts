import {InputType} from "./form.schema";
import {BOT_CONFIG_VERSION_LATEST, NewBot, BotAvatarType, BotType} from "@my-monorepo/shared";

export function getNewBot(data: InputType): NewBot {
  const {botInfo, botConfig, integration} = data;
  return {
    name: botInfo.name,
    description: botInfo.description ?? null,
    type: BotType.AGENT,
    configVersion: BOT_CONFIG_VERSION_LATEST,
    configuration: {
      name: botInfo.name,
      version: BOT_CONFIG_VERSION_LATEST,
      type: BotType.AGENT,
      description: botInfo.description ?? '',
      avatar: {
        type: BotAvatarType.BOT_AVATAR_EMOTE,
        backgroundColor: botInfo.color,
      },
      lm: {
        modelName: botConfig.llm,
        prompt: botConfig.isCustomPrompt ? botConfig.prompt : '',
        apiKey: '',
      },
      thirdPartyIntegration: {
        discord: integration.integrateWithDiscord && integration.discordChannelIds ? {
          isPrivate: true,
          allowedChannels: integration.discordChannelIds,
        } : undefined,
        slack: integration.integrateWithSlack && integration.slackChannelIds ? {
          allowedChannels: integration.slackChannelIds,
        } : undefined,
      }
    },
    boundDocumentId: null,
    public: botInfo.isPublic,
  }
}
