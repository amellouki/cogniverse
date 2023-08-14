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

@Module({
  providers: [PineconeService, PdfSplitterService, DocumentNamespaceService],
  imports: [VectorStoreModule, LlmModule, EmbeddingsModule, DocumentNamespaceModule, PineconeModule, ChainsModule],
})
export class ServicesModule {}
