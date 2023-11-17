import { ConversationalBotConfiguration } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { BotType, KeyNotSetException } from '@my-monorepo/shared';
import { ConversationalChain } from '../chains';
import { BufferMemory } from 'langchain/memory';
import { BaseChainBuilder, IChainBuilderInput } from './base-chain-builder';

export type ConversationalChainBuilderInput = Omit<
  IChainBuilderInput & {
    botConfig: ConversationalBotConfiguration;
  },
  'vectorStore'
>;
export class ConversationalChainBuilder extends BaseChainBuilder {
  build(input: ConversationalChainBuilderInput) {
    const botConfig = input.botConfig;
    if (botConfig.type !== BotType.CONVERSATIONAL) {
      throw Error('Bot is not a conversational');
    }

    const llm = input.llms['lm'];
    if (!llm) {
      throw Error('Language model not configured');
    }

    const openAiApiKey = input.keys.openAiApiKey;
    if (!openAiApiKey) {
      throw new KeyNotSetException('OpenAI api key');
    }

    return ConversationalChain.instantiate({
      template: botConfig.lm.prompt,
      llm,
      memory: new BufferMemory({
        memoryKey: 'chat_history',
        inputKey: 'question', // The key for the input to the chain
        outputKey: 'text', // The key for the final conversational output of the chain
        returnMessages: true, // If using with a chat model
        chatHistory: input.chatHistory,
      }),
    });
  }
}
