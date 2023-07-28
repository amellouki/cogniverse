type LanguageModel = {
  name: string
  type: string
  prompt: string
}

type NewConversation = {
  title: string
  agentId: number
  documentId: number
}

export default NewConversation;
