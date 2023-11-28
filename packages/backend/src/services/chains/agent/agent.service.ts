import { Injectable, Logger } from '@nestjs/common';
import { AgentBuilder } from 'src/lib/chain-builder';
import { Conversation } from '@my-monorepo/shared';
import { CallbackManager } from 'langchain/callbacks';
import { ChatHistoryBuilderService } from 'src/services/chat-history-builder/chat-history-builder.service';
import { AgentLLMBuilder } from 'src/lib/llm-builder/agent-llm-builder';
// import { Calculator } from 'langchain/tools';
import { formatToOpenAITool, SerpAPI, WolframAlphaTool } from 'langchain/tools';
import { createAgent } from 'src/lib/chains/agent';
import * as process from 'process';
import { DallETool } from 'src/lib/tools/DallE';

@Injectable()
export class AgentService extends AgentBuilder {
  private readonly logger = new Logger(AgentService.name);

  constructor(private chatHistoryBuilder: ChatHistoryBuilderService) {
    super();
  }

  fromConversation(
    conversation: Conversation,
    callbackManager: CallbackManager,
    toolsCallbackManager: CallbackManager,
  ) {
    if (conversation.bot.type !== 'AGENT') {
      throw new Error('Bot is not an agent');
    }

    const model = new AgentLLMBuilder().build({
      lmConfig: conversation.bot.configuration.lm,
      callbackManager,
      keys: conversation.creator,
    });
    const serpTool = new SerpAPI(process.env.SERP_API_KEY);
    serpTool.callbacks = toolsCallbackManager;
    const wolframAlpha = new WolframAlphaTool({
      appid: process.env.WALPHA_APP_ID,
      callbacks: toolsCallbackManager,
    });
    const dalle = new DallETool({
      callbacks: toolsCallbackManager,
    });
    const tools = [serpTool, wolframAlpha, dalle];
    const modelWithTools = model.bind({
      tools: tools.map(formatToOpenAITool),
    });
    return createAgent(
      conversation.bot,
      modelWithTools,
      tools,
      this.chatHistoryBuilder.build(conversation.chatHistory),
    );
  }
}
