import { Injectable, Logger } from '@nestjs/common';
import { ENV, QUERY_EMBEDDING_MODEL } from '../../constants';
import { PineconeStore } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { ConfigService } from '@nestjs/config';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { OpenAI } from 'langchain/llms';
import { CallbackManager } from 'langchain/callbacks';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import {
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from 'langchain/schema';
import DocConversationalChain from '../../models/chains/doc-conversational-chain';
import { Message } from '@prisma/client';
import { ChatHistoryService } from '../../repositories/chat-history/chat-history.service';
import NewMessage from '@my-monorepo/shared/dist/types/new-message';
import RCConversation from '@my-monorepo/shared/dist/types/rc-conversation';
import { DocumentNamespaceService } from '../../services/document-namespace/document-namespace.service';
import { Bot, BotType } from '@my-monorepo/shared';

type Callbacks = {
  sendToken: (tokenMessage: NewMessage) => Promise<void>;
  sendRetrieval: (message: Message) => void;
  sendConfirmQuestion: (message: Message) => void;
};

@Injectable()
export class ConversationalRetrievalQaService {
  logger = new Logger(ConversationalRetrievalQaService.name);
  constructor(
    private configService: ConfigService,
    private pinecone: PineconeService,
    private chatHistoryService: ChatHistoryService,
    private documentNamespaceService: DocumentNamespaceService,
  ) {}

  private constructHistory(array: Message[]): ChatMessageHistory {
    const messages = array.map((message) => {
      switch (message.fromType) {
        case 'system':
          return new SystemChatMessage(message.content);
        case 'ai':
          return new AIChatMessage(message.content);
        case 'human':
          return new HumanChatMessage(message.content);
        default:
          throw new Error('message type not supported');
      }
    });
    return new ChatMessageHistory(messages);
  }

  async getCompletion(
    question: string,
    conversation: RCConversation,
    callbacks: Callbacks,
  ) {
    this.logger.log('getCompletion', question);

    const bot = conversation.rcAgent as Bot;
    console.log('agent', bot);
    if (bot.type !== BotType.RETRIEVAL_CONVERSATIONAL) {
      throw Error('Bot is not a retrieval conversational');
    }

    // TODO: move side effects away from pure function
    const added = await this.chatHistoryService.saveMessage({
      content: question,
      rcId: conversation.id,
      fromType: 'human',
      type: 'message',
      fromId: null,
    });
    callbacks.sendConfirmQuestion(added);
    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);
    if (!openAiApiKey) {
      throw new Error(
        'Some environment variables are not set. Please check your .env.local file.',
      );
    }
    const pineconeIndex = await this.pinecone.getIndex();

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: openAiApiKey,
        modelName: QUERY_EMBEDDING_MODEL,
      }),
      {
        pineconeIndex,
        namespace: this.documentNamespaceService.getDocumentNamespace(
          conversation.document,
        ),
      },
    );

    this.logger.log(
      'used namespace for retrieval:',
      this.documentNamespaceService.getDocumentNamespace(conversation.document),
    );

    const conversationModel = new OpenAI({
      openAIApiKey: openAiApiKey,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          // TODO: use observable to split side effects from pure function
          return callbacks.sendToken({
            content: token,
            rcId: conversation.id,
            fromType: 'ai',
            type: 'response-token',
            fromId: bot.id,
          });
        },
      }),
    });

    const retrievalModel = new OpenAI({
      openAIApiKey: openAiApiKey,
      streaming: true,
      // modelName: 'gpt-4', // TODO: make openai model name configurable
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          console.log('handle llm new token on retrieval model', token);
          return callbacks.sendToken({
            content: token,
            rcId: conversation.id,
            fromType: 'ai',
            type: 'retrieval-token',
            fromId: conversation.rcAgent.id,
          });
        },
        handleLLMEnd: async (chainValues) => {
          console.log('handle llm end on retrieval model');
          if (chainValues.generations[0][0]?.text) {
            const message: NewMessage = {
              content: chainValues.generations[0][0]?.text,
              rcId: conversation.id,
              fromType: 'ai',
              type: 'idea',
              fromId: conversation.rcAgent.id,
            };
            // TODO: use observable to split side effects from pure function
            this.chatHistoryService
              .saveMessage(message)
              .then((message) => {
                callbacks.sendRetrieval(message);
              })
              .catch((e) => {
                throw e;
              });
          }
        },
      }),
    });

    const chain = DocConversationalChain.fromLLM(
      conversationModel,
      vectorStore.asRetriever(1),
      {
        returnSourceDocuments: true,
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputKey: 'question', // The key for the input to the chain
          outputKey: 'text', // The key for the final conversational output of the chain
          returnMessages: true, // If using with a chat model
          chatHistory: this.constructHistory(conversation.chatHistory),
        }),
        questionGeneratorChainOptions: {
          llm: retrievalModel,
          template: bot.configuration.retrievalLm?.prompt,
        },
        conversationTemplate: bot.configuration.conversationalLm?.prompt,
      },
    );
    const chainValues = await chain.call({
      question,
      chat_history: this.constructHistory(conversation.chatHistory),
    });

    // TODO: Use observable to split side effects from pure function
    const response = await this.chatHistoryService.saveMessage({
      content: chainValues.text,
      rcId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: bot.id,
    });

    return response;
  }
}
