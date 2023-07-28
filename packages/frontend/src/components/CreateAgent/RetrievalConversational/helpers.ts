import {InputType} from "./form.schema";
import NewRCAgent from "@my-monorepo/shared/src/types/new-rc-agent"
import NewLlm from "@my-monorepo/shared/src/types/new-llm"

export function getNewAgent(data: InputType): NewRCAgent {
  const retrievalLanguageModel: NewLlm | undefined = data.isRLMCustomPrompt && data.rlmPrompt ? {
    prompt: data.rlmPrompt,
    name: "Retrieval model",
    type: "retrieval-model",
  } : undefined
  const conversationModel: NewLlm | undefined = data.isCLMCustomPrompt && data.clmPrompt ? {
    prompt: data.clmPrompt,
    name: "Conversation model",
    type: "conversation-model",
  } : undefined

  return {
    name: data.name,
    retrievalLanguageModel,
    conversationModel,
  }
}
