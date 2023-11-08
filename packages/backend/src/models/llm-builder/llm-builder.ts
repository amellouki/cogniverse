import { OpenAI } from 'langchain/llms/openai';
import { LmConfig } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { AccountKeys } from '@my-monorepo/shared';
import { CallbackManager } from 'langchain/callbacks';

export interface ILlmBuilderInput {
  lmConfig: LmConfig;
  keys: AccountKeys;
  callbackManager: CallbackManager;
}

export class LlmBuilder {
  build({ lmConfig, keys, callbackManager }: ILlmBuilderInput) {
    switch (lmConfig.modelName) {
      case 'gpt-4':
      case 'gpt-3.5-turbo':
        return new OpenAI({
          modelName: lmConfig.modelName,
          openAIApiKey: keys.openAiApiKey,
          streaming: true,
          callbackManager: callbackManager,
        });
      default:
        throw new Error('LLM type not supported');
    }
  }
}
