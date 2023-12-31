import { CallbackManager } from 'langchain/callbacks';
import { BaseLLM } from 'langchain/llms/base';
import { OpenAI } from 'langchain/llms/openai';
import { InternalServerException } from '@my-monorepo/shared';

type Config =
  | {
      type: 'gpt-3.5-turbo';
      apiKey: string;
      callbackManager: CallbackManager;
    }
  | {
      type: 'gpt-4';
      apiKey: string;
      callbackManager: CallbackManager;
    };

function createLlm(config: Config): BaseLLM {
  switch (config.type) {
    case 'gpt-4':
    case 'gpt-3.5-turbo':
      return new OpenAI({
        modelName: config.type,
        openAIApiKey: config.apiKey,
        streaming: true,
        callbackManager: config.callbackManager,
      });
    default:
      throw new InternalServerException('LLM type not supported');
  }
}

export default createLlm;
