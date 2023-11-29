import { Tool } from 'langchain/tools';

export type ToolType = 'SerpAPI' | 'WolframAlpha' | 'Dall-e' | 'Options';
export type ToolRecord = Partial<Record<ToolType, Tool>>;
