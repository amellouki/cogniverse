import { Injectable, Logger } from '@nestjs/common';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { ENV, QUERY_EMBEDDING_MODEL } from '../../constants';
import { OpenAI } from 'langchain/llms';
import { CallbackManager } from 'langchain/callbacks';
import { VectorDBQAChain } from 'langchain/chains';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { PineconeService } from '../../services/pinecone/pinecone.service';

@Injectable()
export class DocQuestionAnsweringService {
  private readonly logger = new Logger(DocQuestionAnsweringService.name);

  constructor(
    private configService: ConfigService,
    private pinecone: PineconeService,
  ) {}

  async generateCompletion(
    query: string,
    handleLLMNewToken: (text: string) => Promise<void>,
  ) {
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

    const model = new OpenAI({
      openAIApiKey: openAiApiKey,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken,
      }),
    });
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      returnSourceDocuments: true,
    });

    const response = await chain.call({ query });
    return { ...response };
  }
}
