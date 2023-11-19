import { BaseChainBuilder, IChainBuilderInput } from 'src/lib/chain-builder';
import {
  BotType,
  InternalServerException,
  KeyNotSetException,
} from '@my-monorepo/shared';
import { createAgent } from 'src/lib/chains/agent';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { formatToOpenAITool, StructuredTool } from 'langchain/tools';

export interface AgentBuilderInput extends Omit<IChainBuilderInput, 'llms'> {
  tools: StructuredTool[];
  agentLLM: ChatOpenAI;
}

export class AgentBuilder extends BaseChainBuilder {
  build(input: AgentBuilderInput) {
    // Convert to OpenAI tool format
    const modelWithTools = input.agentLLM.bind({
      tools: input.tools.map(formatToOpenAITool),
    });

    const botConfig = input.botConfig;
    if (botConfig.type !== BotType.CONVERSATIONAL) {
      throw new InternalServerException('Bot type error');
    }

    const llm = input.agentLLM;
    if (!llm) {
      throw new InternalServerException('model configuration not found');
    }

    const openAiApiKey = input.keys.openAiApiKey;
    if (!openAiApiKey) {
      throw new KeyNotSetException('OpenAI api key');
    }

    return createAgent(modelWithTools, input.tools);
  }
}
