import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone/pinecone.service';
import { PdfSplitterService } from './pdf-splitter/pdf-splitter.service';
import { DocumentNamespaceService } from './document-namespace/document-namespace.service';

@Module({
  providers: [PineconeService, PdfSplitterService, DocumentNamespaceService],
})
export class ServicesModule {}
