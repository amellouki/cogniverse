import { Tool } from 'langchain/tools';

export type ToolType = 'SerpAPI' | 'WolframAlpha' | 'Dall-e';
export type ToolRecord = Partial<Record<ToolType, Tool>>;
