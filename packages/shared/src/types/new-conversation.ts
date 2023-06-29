type LanguageModel = {
  name: string
  type: string
  prompt: string
}

type NewConversation = {
  title: string
  retrievalLanguageModel?: LanguageModel
  conversationModel?: LanguageModel
}

export default NewConversation;
