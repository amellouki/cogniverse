import {InputType} from "./form.schema";
import NewConversation from "@my-monorepo/shared/dist/new-conversation";

export function getNewConversation(data: InputType): NewConversation {
  const retrievalLanguageModel = data.isRLMCustomPrompt && data.rlmPrompt ? {
    prompt: data.rlmPrompt,
    name: "Retrieval model",
    type: "retrieval-model",
  } : undefined
  const conversationModel = data.isCLMCustomPrompt && data.clmPrompt ? {
    prompt: data.clmPrompt,
    name: "Conversation model",
    type: "conversation-model",
  } : undefined

  return {
    title: data.title,
    retrievalLanguageModel,
    conversationModel,
  }
}
