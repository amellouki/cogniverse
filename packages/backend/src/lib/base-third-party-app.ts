import { ConversationalChainService } from '../services/chains/conversational-chain/conversational-chain.service';
import { RetrievalConversationalChainService } from '../services/chains/retrieval-conversational/retrieval-conversational-chain.service';
import { AgentService } from '../services/chains/agent/agent.service';
import {
  AccountKeys,
  Bot,
  BotNotBoundException,
  BotType,
  BotTypeNotSupportedException,
  FullBot,
} from '@my-monorepo/shared';
import { BaseChainBuilder } from './chain-builder';
import { VectorStoreService } from '../services/vector-store/vector-store.service';
import { VectorStore } from 'langchain/vectorstores/base';
import { QUERY_EMBEDDING_MODEL } from '../constants';
import {
  CallBackRecord,
  RealWorldEffects,
  ToolCallbackRecord,
} from './callback-record';
import { LLMRecord } from './llm-record';
import { LmConfig } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { LlmBuilder } from './llm-builder';
import { BaseChatHistoryBuilder } from './chat-history-builder';
import { ToolBuilder } from 'src/lib/tool-builder';
import { StructuredTool } from 'langchain/tools';

export class BaseThirdPartyApp {
  constructor(
    protected conversationalChainService: ConversationalChainService,
    protected retrievalConversationalChainService: RetrievalConversationalChainService,
    protected agentChainService: AgentService,
    protected vectorStoreService: VectorStoreService,
  ) {}

  protected getChain(type: BotType): BaseChainBuilder {
    switch (type) {
      case BotType.CONVERSATIONAL:
        return this.conversationalChainService;
      case BotType.RETRIEVAL_CONVERSATIONAL:
        return this.retrievalConversationalChainService;
      case BotType.AGENT:
        return this.agentChainService;
      default:
        throw new BotTypeNotSupportedException();
    }
  }

  protected async getVectorStore(bot: FullBot): Promise<VectorStore> {
    if (bot.type === BotType.RETRIEVAL_CONVERSATIONAL && !bot.boundDocument) {
      throw new BotNotBoundException();
    }
    if (!bot.boundDocument) {
      return null;
    }
    return await this.vectorStoreService.createVectorStore({
      type: 'Pinecone',
      embeddingsConfig: {
        apiKey: bot.creator.openAiApiKey,
        type: QUERY_EMBEDDING_MODEL,
      },
      document: bot.boundDocument,
    });
  }

  protected getLLMRecord(
    callbacks: CallBackRecord,
    botConfig: Bot['configuration'],
    keys: AccountKeys,
  ): LLMRecord {
    const record = {};
    Object.keys(callbacks).forEach((key) => {
      const callback = callbacks[key];
      const lmConfig = botConfig[key] as LmConfig;
      if (callback && lmConfig) {
        record[key] = new LlmBuilder().build({
          lmConfig,
          keys: keys,
          callbackManager: callback,
        });
      }
    });
    return record;
  }

  protected getTools(
    callbacks: ToolCallbackRecord,
    realWorldEffects: RealWorldEffects,
    keys?: AccountKeys,
  ): StructuredTool[] {
    const tools = [];
    Object.keys(callbacks).forEach((key) => {
      const callback = callbacks[key];
      const realWorldEffect = realWorldEffects[key];
      if (callback) {
        tools.push(
          new ToolBuilder().build({
            toolType: key,
            callbackManager: callback,
            realWorldEffect,
            keys,
          }),
        );
      }
    });
    return tools;
  }

  protected getHistory<MessageType>(
    builder: BaseChatHistoryBuilder<MessageType>,
    chatHistory: MessageType[],
  ) {
    return builder.build(chatHistory);
  }
}
