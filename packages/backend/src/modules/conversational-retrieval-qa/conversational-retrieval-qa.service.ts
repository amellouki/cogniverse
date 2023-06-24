import { Injectable } from '@nestjs/common';
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
import DocConversationalChain from '../../model/chains/doc-conversational-chain';
import { Conversation, LanguageModel, Message } from '@prisma/client';
import { ChatHistoryService } from '../../repositories/chat-history/chat-history.service';

type Callbacks = {
  sendToken: (tokenMessage: Omit<Message, 'id'>) => Promise<void>;
  sendRetrieval: (message: Message) => void;
  sendConfirmQuestion: (message: Message) => void;
};

@Injectable()
export class ConversationalRetrievalQaService {
  constructor(
    private configService: ConfigService,
    private pinecone: PineconeService,
    private chatHistoryService: ChatHistoryService,
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
    conversation: Conversation & {
      ChatHistory: Message[];
      conversationModel: LanguageModel;
      retrievalLanguageModel: LanguageModel;
    },
    callbacks: Callbacks,
  ) {
    // TODO: move side effects away from pure function
    const added = await this.chatHistoryService.saveMessage({
      content: question,
      conversationId: conversation.id,
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
      { pineconeIndex },
    );

    const conversationModel = new OpenAI({
      openAIApiKey: openAiApiKey,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken: (token) => {
          // TODO: use observable to split side effects from pure function
          return callbacks.sendToken({
            content: token,
            conversationId: conversation.id,
            fromType: 'ai',
            type: 'response-token',
            fromId: conversation.conversationModelId,
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
          return callbacks.sendToken({
            content: token,
            conversationId: conversation.id,
            fromType: 'ai',
            type: 'retrieval-token',
            fromId: conversation.retrievalLanguageModelId,
          });
        },
        handleLLMEnd: async (chainValues) => {
          console.log('handle llm end on retrieval model');
          if (chainValues.generations[0][0]?.text) {
            const message = {
              content: chainValues.generations[0][0]?.text,
              conversationId: conversation.id,
              fromType: 'ai',
              type: 'idea',
              fromId: conversation.retrievalLanguageModelId,
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
          chatHistory: this.constructHistory(conversation.ChatHistory),
        }),
        questionGeneratorChainOptions: {
          llm: retrievalModel,
          template: conversation.retrievalLanguageModel.prompt,
        },
        conversationTemplate: conversation.conversationModel.prompt,
      },
    );
    const chainValues = await chain.call({
      question,
      chat_history: this.constructHistory(conversation.ChatHistory),
    });

    // TODO: Use observable to split side effects from pure function
    const response = await this.chatHistoryService.saveMessage({
      content: chainValues.text,
      conversationId: conversation.id,
      fromType: 'ai',
      type: 'message',
      fromId: conversation.conversationModelId,
    });

    return response;
  }
}
