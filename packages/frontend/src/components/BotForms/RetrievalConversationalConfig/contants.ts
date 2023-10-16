export const RLM_PROMPT_PLACEHOLDERS = [
  "{chat_history}", // The chat history of the conversation so far
  "{question}", // The last question asked by the user
]

export const CLM_PROMPT_PLACEHOLDERS = [
  ...RLM_PROMPT_PLACEHOLDERS,
  "{context}" // The retrieved documents
]
