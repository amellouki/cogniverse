import {ConversationalBot, RcBot, BotAvatar} from "./bot-configuration/0.0.1";
import {BotAvatarType} from "./bot-avatar-type";
import BotType from "./bot-type";
import {Account} from "../account";

type Bot = ConversationalBot | RcBot
type FullBot = Bot & {creator: Account}
type NewBot = Omit<Bot, 'id' | 'boundDocument' | 'creatorId'>
type UpdatedBot = Omit<Bot, 'boundDocument' | 'creatorId'>

export {
  Bot,
  NewBot,
  ConversationalBot,
  RcBot,
  BotType,
  BotAvatarType,
  BotAvatar,
  UpdatedBot,
  FullBot,
}
