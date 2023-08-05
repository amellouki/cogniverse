import {Bot} from "@prisma/client";
import NewLlm from "../new-llm";

type NewBot = Omit<Bot, 'id' | 'conversationModelId' | 'retrievalLanguageModelId'> & {
  conversationModel?: NewLlm
  retrievalLanguageModel?: NewLlm
}

export default NewBot;
