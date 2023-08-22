import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';

@Module({
  providers: [PineconeService],
  exports: [PineconeService],
})
export class PineconeModule {}
