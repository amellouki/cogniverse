import { Injectable } from '@nestjs/common';
import { BaseChain } from 'langchain/chains';
import {
  AccountKeys,
  BotType,
  Conversation,
  DiscordConversation,
  FullBot,
  KeyNotSetException,
  SlackConversation,
} from '@my-monorepo/shared';
import { QUERY_EMBEDDING_MODEL } from '../../../constants';
import createLlm from '../../llm/create-llm';
import { CallbackManager } from 'langchain/callbacks';
import DocConversationalChain from 'src/lib/chains/doc-conversational-chain';
import { BufferMemory } from 'langchain/memory';
import { ConfigService } from '@nestjs/config';
import { VectorStoreService } from '../../vector-store/vector-store.service';
import { ChatHistoryBuilderService } from '../../chat-history-builder/chat-history-builder.service';
import { RcBotConfiguration } from '@my-monorepo/shared/dist/types/bot/bot-configuration/0.0.1';
import { DocumentMetadata } from '@prisma/client';
import { BaseChatMessageHistory } from 'langchain/schema';
import { VectorStore } from 'langchain/vectorstores/base';
import { RCChainBuilder } from 'src/lib/chain-builder';

@Injectable()
export class RetrievalConversationalChainService extends RCChainBuilder {
  constructor(
    private configService: ConfigService,
    private vectorStoreService: VectorStoreService,
    private chatHistoryBuilderService: ChatHistoryBuilderService,
  ) {
    super();
  }

  private async createChain(
    botConfig: RcBotConfiguration,
    keys: AccountKeys,
    document: DocumentMetadata,
    retrievalCallbackManager: CallbackManager,
    conversationalCallbackManager: CallbackManager,
    chatHistory: BaseChatMessageHistory,
  ): Promise<BaseChain> {
    const openAiApiKey = keys.openAiApiKey;
    if (!openAiApiKey) {
      throw new KeyNotSetException('OpenAI API key');
    }

    const vectorStore: VectorStore =
      await this.vectorStoreService.createVectorStore({
        type: 'Pinecone',
        embeddingsConfig: {
          apiKey: openAiApiKey,
          type: QUERY_EMBEDDING_MODEL,
        },
        document,
      });
    const retrievalModel = createLlm({
      type: (botConfig.retrievalLm?.modelName as any) || 'gpt-3.5-turbo', // TODO: be more specific
      apiKey: openAiApiKey,
      callbackManager: retrievalCallbackManager,
    });
    const conversationModel = createLlm({
      type: (botConfig.conversationalLm?.modelName as any) || 'gpt-3.5-turbo', // TODO: be more specific
      apiKey: openAiApiKey,
      callbackManager: conversationalCallbackManager,
    });
    return DocConversationalChain.fromLLM(
      conversationModel,
      vectorStore.asRetriever(4),
      {
        returnSourceDocuments: true,
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputKey: 'question', // The key for the input to the chain
          outputKey: 'text', // The key for the final conversational output of the chain
          returnMessages: true, // If using with a chat model
          chatHistory: chatHistory,
        }),
        questionGeneratorChainOptions: {
          llm: retrievalModel,
          template: botConfig.retrievalLm?.prompt,
        },
        conversationTemplate: botConfig.conversationalLm?.prompt,
      },
    );
  }

  // TODO: refactoring remove this nad use the new chain builder
  async fromConversation(
    question: string,
    conversation: Conversation,
    retrievalCallbackManager: CallbackManager,
    conversationalCallbackManager: CallbackManager,
  ): Promise<BaseChain> {
    const botConfig = conversation.bot.configuration;
    if (botConfig.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not a retrieval conversational');
    }
    const document = conversation.bot.boundDocument ?? conversation.document;
    return this.createChain(
      botConfig,
      conversation.creator,
      document,
      retrievalCallbackManager,
      conversationalCallbackManager,
      this.chatHistoryBuilderService.build(conversation.chatHistory),
    );
  }
}
