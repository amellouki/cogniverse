import { Module } from '@nestjs/common';
import { ConversationalRetrievalQaService } from './conversational-retrieval-qa.service';
import { ConversationalRetrievalQaGateway } from './conversational-retrieval-qa.gateway';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { RepositoriesModule } from '../../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [
    ConversationalRetrievalQaGateway,
    ConversationalRetrievalQaService,
    PineconeService,
  ],
  controllers: [],
})
export class ConversationalRetrievalQaModule {}
