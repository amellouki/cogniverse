import { Module } from '@nestjs/common';
import { VectorStoreService } from './vector-store.service';
import {EmbeddingsModule} from "../embeddings/embeddings.module";
import {PineconeModule} from "../pinecone/pinecone.module";
import {DocumentNamespaceModule} from "../document-namespace/document-namespace.module";

@Module({
  providers: [VectorStoreService],
  imports: [EmbeddingsModule, PineconeModule, DocumentNamespaceModule],
  exports: [VectorStoreService]
})
export class VectorStoreModule {}
