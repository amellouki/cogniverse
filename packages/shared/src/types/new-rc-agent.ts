import {RCAgent} from "@prisma/client";
import NewLlm from "./new-llm";

type NewRCAgent = Omit<RCAgent, 'id' | 'conversationModelId' | 'retrievalLanguageModelId'> & {
  conversationModel?: NewLlm
  retrievalLanguageModel?: NewLlm
}

export default NewRCAgent;
