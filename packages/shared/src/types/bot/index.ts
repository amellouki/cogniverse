import {ConversationalBot, RcBot} from "./bot-configuration/0.0.1";
import BotType from "./bot-type";
import NewLlm from "../new-llm";

type Bot = ConversationalBot | RcBot
type NewBot = Omit<Bot, 'id' | 'conversationModelId' | 'retrievalLanguageModelId' | 'conversationModel' | 'retrievalLanguageModel'> & { // TODO: remove these
  conversationModel?: NewLlm
  retrievalLanguageModel?: NewLlm
}

export {
  Bot,
  NewBot,
  ConversationalBot,
  RcBot,
  BotType,
}
