import { Injectable } from '@nestjs/common';
import { Embeddings, OpenAIEmbeddings } from 'langchain/embeddings';

export type EmbeddingsConfig = {
  type: 'text-search-babbage-query-001' | 'text-search-babbage-doc-001';
  apiKey: string;
};

@Injectable()
export class EmbeddingsService {
  createEmbedding(config: EmbeddingsConfig): Embeddings {
    switch (config.type) {
      case 'text-search-babbage-query-001':
      case 'text-search-babbage-doc-001':
        return new OpenAIEmbeddings({
          openAIApiKey: config.apiKey,
          modelName: config.type,
        });
      default:
        throw new Error('Embedding type not supported');
    }
  }
}
