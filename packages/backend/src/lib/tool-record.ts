import { Tool } from 'langchain/tools';

export type ToolType =
  | 'SerpAPI'
  | 'WolframAlpha'
  | 'Dall-e'
  | 'Options'
  | 'Retrieval';
export type ToolRecord = Partial<Record<ToolType, Tool>>;
