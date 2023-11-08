import { LlmKeyType } from './llm-key-type';
import { BaseLLM } from 'langchain/llms/base';

export type LLMRecord = Record<LlmKeyType, BaseLLM>;
