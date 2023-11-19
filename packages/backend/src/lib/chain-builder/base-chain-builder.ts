import { BaseChain } from 'langchain/chains';
import { AccountKeys } from '@my-monorepo/shared';
import { BaseChatMessageHistory } from 'langchain/schema';
import { BotConfiguration } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { VectorStore } from 'langchain/vectorstores/base';
import { LLMRecord } from '../llm-record';

export interface IChainBuilderInput {
  chatHistory: BaseChatMessageHistory;
  botConfig: BotConfiguration;
  keys: AccountKeys;
  llms: LLMRecord;
  vectorStore: VectorStore;
}

export type BaseChainBuilderInput = Partial<IChainBuilderInput>;
export abstract class BaseChainBuilder {
  abstract build(input: BaseChainBuilderInput): BaseChain;
}
