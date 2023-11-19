import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { Runnable, RunnableSequence } from 'langchain/schema/runnable';
import { AgentExecutor } from 'langchain/agents';
import { formatToOpenAIToolMessages } from 'langchain/agents/format_scratchpad/openai_tools';
import {
  OpenAIToolsAgentOutputParser,
  type ToolsAgentStep,
} from 'langchain/agents/openai/output_parser';
import { StructuredTool } from 'langchain/tools';

export const createAgent = (
  modelWithTools: Runnable,
  tools: StructuredTool[],
) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ['ai', 'You are a helpful assistant'],
    ['human', '{question}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ]);

  const runnableAgent = RunnableSequence.from([
    {
      question: (i: { question: string; steps: ToolsAgentStep[] }) =>
        i.question,
      agent_scratchpad: (i: { question: string; steps: ToolsAgentStep[] }) =>
        formatToOpenAIToolMessages(i.steps),
    },
    prompt,
    modelWithTools,
    new OpenAIToolsAgentOutputParser(),
  ]).withConfig({ runName: 'OpenAIToolsAgent' });

  return AgentExecutor.fromAgentAndTools({
    agent: runnableAgent,
    tools,
  });
};
