import { Module } from '@nestjs/common';
import { ConversationalRetrievalQaService } from './conversational-retrieval-qa.service';
import { ConversationalRetrievalQaGateway } from './conversational-retrieval-qa.gateway';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { DocumentNamespaceService } from '../../services/document-namespace/document-namespace.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    ConversationalRetrievalQaGateway,
    ConversationalRetrievalQaService,
    PineconeService,
    DocumentNamespaceService,
  ],
  controllers: [],
})
export class ConversationalRetrievalQaModule {}
