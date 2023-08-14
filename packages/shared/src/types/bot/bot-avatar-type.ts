export const BotAvatarType = {
  BOT_AVATAR_IMAGE: 'IMAGE' as const,
  BOT_AVATAR_EMOTE: 'EMOTE' as const
}

export type BotAvatarType = (typeof BotAvatarType)[keyof typeof BotAvatarType]
