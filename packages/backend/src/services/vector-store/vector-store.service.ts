import { Injectable } from '@nestjs/common';
import {
  EmbeddingsConfig,
  EmbeddingsService,
} from '../embeddings/embeddings.service';
import { DocumentNamespaceService } from '../document-namespace/document-namespace.service';
import { PineconeService } from '../pinecone/pinecone.service';
import { DocumentMetadata } from '@my-monorepo/shared';
import { VectorStore } from 'langchain/vectorstores/base';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

export type VectorStoreConfig = {
  embeddingsConfig: EmbeddingsConfig;
  type: 'Pinecone';
  document: DocumentMetadata;
};

@Injectable()
export class VectorStoreService {
  constructor(
    private embeddingsService: EmbeddingsService,
    private documentNamespaceService: DocumentNamespaceService,
    private pineconeService: PineconeService,
  ) {}

  async createVectorStore(config: VectorStoreConfig): Promise<VectorStore> {
    const embeddings = this.embeddingsService.createEmbedding(
      config.embeddingsConfig,
    );
    switch (config.type) {
      case 'Pinecone':
        const pineconeIndex = await this.pineconeService.getIndex();
        return PineconeStore.fromExistingIndex(embeddings, {
          pineconeIndex,
          namespace: this.documentNamespaceService.getDocumentNamespace(
            config.document,
          ),
        });
      default:
        throw new Error('Vector store type not supported');
    }
  }
}
