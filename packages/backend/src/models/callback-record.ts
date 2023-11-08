import { LlmKeyType } from './llm-key-type';
import { Callbacks } from 'langchain/callbacks';

export type CallBackRecord = Record<LlmKeyType, Callbacks>;
