import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { Runnable, RunnableSequence } from 'langchain/schema/runnable';
import { AgentExecutor } from 'langchain/agents';
import { formatToOpenAIToolMessages } from 'langchain/agents/format_scratchpad/openai_tools';
import {
  OpenAIToolsAgentOutputParser,
  type ToolsAgentStep,
} from 'langchain/agents/openai/output_parser';
import { StructuredTool } from 'langchain/tools';
import { Bot, BotTypeNotSupportedException } from '@my-monorepo/shared';

export const createAgent = (
  bot: Bot,
  modelWithTools: Runnable,
  tools: StructuredTool[],
) => {
  const botConfig = bot.configuration;
  if (botConfig.type !== 'AGENT') {
    throw new BotTypeNotSupportedException();
  }
  const prompt = ChatPromptTemplate.fromMessages([
    ['ai', botConfig.lm.prompt ?? 'You are a helpful assistant'],
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
