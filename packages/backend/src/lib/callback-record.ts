import { LlmKeyType } from './llm-key-type';
import { CallbackManager } from 'langchain/callbacks';
import { ToolType } from 'src/lib/tool-record';

export type CallBackRecord = Partial<Record<LlmKeyType, CallbackManager>>;
export type ToolCallbackRecord = Partial<Record<ToolType, CallbackManager>>;
