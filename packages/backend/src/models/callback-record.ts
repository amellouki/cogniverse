import { LlmKeyType } from './llm-key-type';
import { CallbackManager } from 'langchain/callbacks';

export type CallBackRecord = Partial<Record<LlmKeyType, CallbackManager>>;
