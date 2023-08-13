import {InputType} from "./form.schema";
import {BOT_CONFIG_VERSION_LATEST, NewBot, BotAvatarType, BotType} from "@my-monorepo/shared";

export function getNewBot(data: InputType): NewBot {
  return {
    name: data.name,
    description: "[TODO]",
    type: BotType.CONVERSATIONAL,
    configVersion: BOT_CONFIG_VERSION_LATEST,
    configuration: {
      name: data.name,
      version: BOT_CONFIG_VERSION_LATEST,
      type: BotType.CONVERSATIONAL,
      description: "[TODO]",
      avatar: {
        type: BotAvatarType.BOT_AVATAR_EMOTE,
        backgroundColor: data.color,
      },
      lm: {
        modelName: "[TODO]",
        prompt: data.prompt,
        apiKey: "[TODO]",
      }
    }
  }
}
