import {ConversationalBot, RcBot} from "./bot-configuration/0.0.1";
import {BotAvatarType} from "./bot-avatar-type";
import BotType from "./bot-type";

type Bot = ConversationalBot | RcBot
type NewBot = Omit<Bot, 'id'>

export {
  Bot,
  NewBot,
  ConversationalBot,
  RcBot,
  BotType,
  BotAvatarType,
}
