import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone/pinecone.service';
import { PdfSplitterService } from './pdf-splitter/pdf-splitter.service';
import { DocumentNamespaceService } from './document-namespace/document-namespace.service';
import { VectorStoreModule } from './vector-store/vector-store.module';
import { LlmModule } from './llm/llm.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import { DocumentNamespaceModule } from './document-namespace/document-namespace.module';
import { PineconeModule } from './pinecone/pinecone.module';
import { ChainsModule } from './chains/chains.module';
import { ChatHistoryBuilderModule } from './chat-history-builder/chat-history-builder.module';
import { AxiosModule } from './axios/axios.module';

const modules = [
  VectorStoreModule,
  LlmModule,
  EmbeddingsModule,
  DocumentNamespaceModule,
  PineconeModule,
  ChainsModule,
  ChatHistoryBuilderModule,
  AxiosModule,
];

@Module({
  providers: [PineconeService, PdfSplitterService, DocumentNamespaceService],
  imports: modules,
  exports: modules,
})
export class ServicesModule {}
