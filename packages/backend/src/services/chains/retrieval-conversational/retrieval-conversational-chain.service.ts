import { Injectable } from '@nestjs/common';
import { BaseChain } from 'langchain/chains';
import {
  Bot,
  BotType,
  Conversation,
  DiscordConversation,
} from '@my-monorepo/shared';
import { ENV, QUERY_EMBEDDING_MODEL } from '../../../constants';
import createLlm from '../../llm/create-llm';
import { CallbackManager } from 'langchain/callbacks';
import DocConversationalChain from '../../../models/chains/doc-conversational-chain';
import { BufferMemory } from 'langchain/memory';
import { ConfigService } from '@nestjs/config';
import { VectorStoreService } from '../../vector-store/vector-store.service';
import { ChatHistoryBuilderService } from '../../chat-history-builder/chat-history-builder.service';

@Injectable()
export class RetrievalConversationalChainService {
  constructor(
    private configService: ConfigService,
    private vectorStoreService: VectorStoreService,
    private chatHistoryBuilderService: ChatHistoryBuilderService,
  ) {}

  async fromConversation(
    question: string,
    conversation: Conversation,
    retrievalCallbackManager: CallbackManager,
    conversationalCallbackManager: CallbackManager,
  ): Promise<BaseChain> {
    const bot = conversation.bot;
    if (bot.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not a retrieval conversational');
    }

    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);
    if (!openAiApiKey) {
      throw new Error(
        'Some environment variables are not set. Please check your .env.local file.',
      );
    }

    const document = conversation.bot.boundDocument ?? conversation.document;
    const vectorStore = await this.vectorStoreService.createVectorStore({
      type: 'Pinecone',
      embeddingsConfig: {
        apiKey: openAiApiKey,
        type: QUERY_EMBEDDING_MODEL,
      },
      document,
    });
    const retrievalModel = createLlm({
      type: 'gpt-3.5-turbo',
      apiKey: openAiApiKey,
      callbackManager: retrievalCallbackManager,
    });
    const conversationModel = createLlm({
      type: 'gpt-3.5-turbo',
      apiKey: openAiApiKey,
      callbackManager: conversationalCallbackManager,
    });
    return DocConversationalChain.fromLLM(
      conversationModel,
      vectorStore.asRetriever(1),
      {
        returnSourceDocuments: true,
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputKey: 'question', // The key for the input to the chain
          outputKey: 'text', // The key for the final conversational output of the chain
          returnMessages: true, // If using with a chat model
          chatHistory: this.chatHistoryBuilderService.build(
            conversation.chatHistory,
          ),
        }),
        questionGeneratorChainOptions: {
          llm: retrievalModel,
          template: bot.configuration.retrievalLm?.prompt,
        },
        conversationTemplate: bot.configuration.conversationalLm?.prompt,
      },
    );
  }

  async fromDiscordConversation(
    conversation: DiscordConversation,
    targetBot: Bot,
    retrievalCallbackManager: CallbackManager,
    conversationalCallbackManager: CallbackManager,
  ) {
    const bot = targetBot;
    if (bot.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not a retrieval conversational');
    }

    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);
    if (!openAiApiKey) {
      throw new Error(
        'Some environment variables are not set. Please check your .env.local file.',
      );
    }

    const document = bot.boundDocument;
    if (!document) {
      throw new Error('Bot has no bound document');
    }
    const vectorStore = await this.vectorStoreService.createVectorStore({
      type: 'Pinecone',
      embeddingsConfig: {
        apiKey: openAiApiKey,
        type: QUERY_EMBEDDING_MODEL,
      },
      document,
    });
    const retrievalModel = createLlm({
      type: 'gpt-3.5-turbo',
      apiKey: openAiApiKey,
      callbackManager: retrievalCallbackManager,
    });
    const conversationModel = createLlm({
      type: 'gpt-3.5-turbo',
      apiKey: openAiApiKey,
      callbackManager: conversationalCallbackManager,
    });
    return DocConversationalChain.fromLLM(
      conversationModel,
      vectorStore.asRetriever(1),
      {
        returnSourceDocuments: true,
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputKey: 'question', // The key for the input to the chain
          outputKey: 'text', // The key for the final conversational output of the chain
          returnMessages: true, // If using with a chat model
          chatHistory: this.chatHistoryBuilderService.buildFromDiscord(
            conversation.chatHistory,
          ),
        }),
        questionGeneratorChainOptions: {
          llm: retrievalModel,
          template: bot.configuration.retrievalLm?.prompt,
        },
        conversationTemplate: bot.configuration.conversationalLm?.prompt,
      },
    );
  }
}
