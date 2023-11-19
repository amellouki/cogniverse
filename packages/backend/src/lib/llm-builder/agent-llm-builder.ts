import { LmConfig } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import {
  AccountKeys,
  LanguageModelNotSupportedException,
} from '@my-monorepo/shared';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';

export interface ILlmBuilderInput {
  lmConfig: LmConfig;
  keys: AccountKeys;
  callbackManager: CallbackManager;
}

export class AgentLLMBuilder {
  // currently only supports ChatOpenAI
  build({ lmConfig, keys, callbackManager }: ILlmBuilderInput): ChatOpenAI {
    switch (lmConfig.modelName) {
      case 'gpt-4':
      case 'gpt-3.5-turbo':
      case 'gpt-4-1106-preview':
      case 'gpt-3.5-turbo-1106':
        return new ChatOpenAI({
          modelName: lmConfig.modelName,
          openAIApiKey: keys.openAiApiKey,
          streaming: true,
          callbacks: callbackManager,
        });
      default:
        throw new LanguageModelNotSupportedException();
    }
  }
}
