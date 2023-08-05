export const BotAvatarType = {
  BOT_AVATAR_IMAGE: 'IMAGE',
  BOT_AVATAR_EMOTE: 'EMOTE'
}

export type BotAvatarType = (typeof BotAvatarType)[keyof typeof BotAvatarType]
