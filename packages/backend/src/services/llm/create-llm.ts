import {BaseLLM, OpenAI} from "langchain/llms";
import {CallbackManager} from "langchain/callbacks";

type Config = {
  type: 'gpt-3.5-turbo';
  apiKey: string;
  callbackManager: CallbackManager;
} | {
  type: 'gpt-4';
  apiKey: string;
  callbackManager: CallbackManager;
}

function createLlm(config: Config): BaseLLM {
  switch (config.type) {
    case "gpt-4":
    case 'gpt-3.5-turbo':
      return new OpenAI({
        modelName: config.type,
        openAIApiKey: config.apiKey,
        streaming: true,
        callbackManager: config.callbackManager,
      });
    default:
      throw new Error('LLM type not supported');
  }
}

export default createLlm;
