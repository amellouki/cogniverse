export const RC_QUESTION_GENERATION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`

export const RC_QA_TEMPLATE = `You are a helpful AI assistant. Use the following pieces of context and chat history to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

Context:
{context}

Chat History:
{chat_history}

Question: {question}
Helpful answer:`


export const CONVERSATIONAL_PROMPT = `As an AI assistant you are helpful, creative, clever, and friendly.`
