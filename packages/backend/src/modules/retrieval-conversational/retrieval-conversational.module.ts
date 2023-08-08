import { Module } from '@nestjs/common';
import { RetrievalConversationalService } from './retrieval-conversational.service';
import { RetrievalConversationalGateway } from './retrieval-conversational.gateway';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { DocumentNamespaceService } from '../../services/document-namespace/document-namespace.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    RetrievalConversationalGateway,
    RetrievalConversationalService,
    PineconeService,
    DocumentNamespaceService,
  ],
  controllers: [],
})
export class RetrievalConversationalModule {}
