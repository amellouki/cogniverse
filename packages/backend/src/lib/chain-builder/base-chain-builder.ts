import { BaseChain } from 'langchain/chains';
import { AccountKeys, Bot } from '@my-monorepo/shared';
import { BaseChatMessageHistory } from 'langchain/schema';
import { VectorStore } from 'langchain/vectorstores/base';
import { LLMRecord } from '../llm-record';
import { StructuredTool } from 'langchain/tools';
import { ChatOpenAI } from 'langchain/chat_models/openai';

export interface IChainBuilderInput {
  chatHistory: BaseChatMessageHistory;
  keys: AccountKeys;
  llms: LLMRecord;
  vectorStore: VectorStore;
  //
  tools: StructuredTool[];
  agentLLM: ChatOpenAI;
  bot: Bot;
}

export type BaseChainBuilderInput = Partial<IChainBuilderInput>;
export abstract class BaseChainBuilder {
  abstract build(input: BaseChainBuilderInput): BaseChain;
}
