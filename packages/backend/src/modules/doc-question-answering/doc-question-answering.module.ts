import { Module } from '@nestjs/common';
import { DocQuestionAnsweringController } from './doc-question-answering.controller';
import { DocQuestionAnsweringService } from './doc-question-answering.service';
import { PineconeService } from '../../services/pinecone/pinecone.service';

@Module({
  controllers: [DocQuestionAnsweringController],
  providers: [DocQuestionAnsweringService, PineconeService],
})
export class DocQuestionAnsweringModule {}
