import { Module } from '@nestjs/common';
import { PdfEmbeddingController } from './pdf-embedding.controller';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { PdfSplitterService } from '../../services/pdf-splitter/pdf-splitter.service';
import {DocumentMetadataModule} from "../../repositories/document-metadata/document-metadata.module";
import { PdfEmbeddingService } from './pdf-embedding.service';

@Module({
  imports: [DocumentMetadataModule],
  controllers: [PdfEmbeddingController],
  providers: [PineconeService, PdfSplitterService, PdfEmbeddingService],
})
export class PdfEmbeddingModule {}
