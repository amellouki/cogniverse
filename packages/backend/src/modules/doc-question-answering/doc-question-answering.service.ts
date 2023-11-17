import { Injectable, Logger } from '@nestjs/common';

import { ENV, QUERY_EMBEDDING_MODEL } from '../../constants';

import { CallbackManager } from 'langchain/callbacks';
import { VectorDBQAChain } from 'langchain/chains';
import { ConfigService } from '@nestjs/config';
import { PineconeService } from 'src/services/pinecone/pinecone.service';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { EnvironmentVariableNotSetException } from '@my-monorepo/shared';

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
      throw new EnvironmentVariableNotSetException(
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
