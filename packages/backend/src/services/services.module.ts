import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone/pinecone.service';
import { PdfSplitterService } from './pdf-splitter/pdf-splitter.service';

@Module({
  providers: [PineconeService, PdfSplitterService],
})
export class ServicesModule {}
