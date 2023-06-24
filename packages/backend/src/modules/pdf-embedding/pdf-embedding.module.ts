import { Module } from '@nestjs/common';
import { PdfEmbeddingController } from './pdf-embedding.controller';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { PdfSplitterService } from '../../services/pdf-splitter/pdf-splitter.service';

@Module({
  controllers: [PdfEmbeddingController],
  providers: [PineconeService, PdfSplitterService],
})
export class PdfEmbeddingModule {}
