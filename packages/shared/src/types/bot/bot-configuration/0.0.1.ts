import {BOT_CONFIG_VERSION_V0_0_1} from "../../../constants";
import BotType from "../bot-type";
import {BotAvatarType} from "../bot-avatar-type";
import {Prisma} from ".prisma/client";
import Bot from "../bot";
import {DocumentMetadata} from "../../document-metadata";

export type ImageAvatar = {
  type: typeof BotAvatarType.BOT_AVATAR_IMAGE,
  url: string,
}

export type EmoteAvatar = {
  type: typeof BotAvatarType.BOT_AVATAR_EMOTE,
  backgroundColor: string,
}

export type BotAvatar = ImageAvatar | EmoteAvatar

export interface BotConfiguration {
  name: string
  version: typeof BOT_CONFIG_VERSION_V0_0_1
  type: BotType,
  description: string,
  avatar: BotAvatar,
}

export type LmConfig = {
  modelName: string,
  prompt?: string,
  apiKey: string,
}

export interface ConversationalBotConfiguration extends BotConfiguration {
  type: typeof BotType.CONVERSATIONAL
  lm?: LmConfig
}

export interface RcBotConfiguration extends BotConfiguration {
  type: typeof BotType.RETRIEVAL_CONVERSATIONAL,
  retrievalLm?: LmConfig,
  conversationalLm?: LmConfig,
}

export interface RcBot extends Bot {
  type: typeof BotType.RETRIEVAL_CONVERSATIONAL,
  configVersion: typeof BOT_CONFIG_VERSION_V0_0_1,
  configuration: Prisma.JsonObject & RcBotConfiguration
  boundDocument: DocumentMetadata | null
}

export interface ConversationalBot extends Bot {
  type: typeof BotType.CONVERSATIONAL,
  configVersion: typeof BOT_CONFIG_VERSION_V0_0_1,
  configuration: Prisma.JsonObject & ConversationalBotConfiguration
  boundDocument: null
}

