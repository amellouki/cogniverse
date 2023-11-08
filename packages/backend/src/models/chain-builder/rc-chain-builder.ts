import { RcBotConfiguration } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { BotType } from '@my-monorepo/shared';
import DocConversationalChain from '../chains/doc-conversational-chain';
import { BufferMemory } from 'langchain/memory';
import { BaseChainBuilder, IChainBuilderInput } from './base-chain-builder';

export type RCChainBuilderInput = IChainBuilderInput & {
  botConfig: RcBotConfiguration;
};

export class RCChainBuilder extends BaseChainBuilder {
  build(input: RCChainBuilderInput) {
    const botConfig = input.botConfig;
    if (botConfig.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not of the right type');
    }

    const openAiApiKey = input.keys.openAiApiKey;
    if (!openAiApiKey) {
      throw new Error(
        'Please set your OpenAI API key in your account settings.',
      );
    }

    const retrievalModel = input.llms['retrievalLm'];
    const conversationModel = input.llms['conversationalLm'];
    if (!retrievalModel || !conversationModel) {
      throw Error('Language models not configured');
    }

    const vectorStore = input.vectorStore;
    return DocConversationalChain.fromLLM(
      conversationModel,
      vectorStore.asRetriever(4),
      {
        returnSourceDocuments: true,
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputKey: 'question', // The key for the input to the chain
          outputKey: 'text', // The key for the final conversational output of the chain
          returnMessages: true, // If using with a chat model
          chatHistory: input.chatHistory,
        }),
        questionGeneratorChainOptions: {
          llm: retrievalModel,
          template: botConfig.retrievalLm?.prompt,
        },
        conversationTemplate: botConfig.conversationalLm?.prompt,
      },
    );
  }
}

// const retrievalModel = createLlm({
//   type: (botConfig.retrievalLm?.modelName as any) || 'gpt-3.5-turbo', // TODO: be more specific
//   apiKey: openAiApiKey,
//   callbackManager: retrievalCallbackManager,
// });
// const conversationModel = createLlm({
//   type: (botConfig.conversationalLm?.modelName as any) || 'gpt-3.5-turbo', // TODO: be more specific
//   apiKey: openAiApiKey,
//   callbackManager: conversationalCallbackManager,
// });
