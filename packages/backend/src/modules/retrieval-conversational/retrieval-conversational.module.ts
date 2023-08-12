import { Module } from '@nestjs/common';
import { RetrievalConversationalService } from './retrieval-conversational.service';
import { RetrievalConversationalGateway } from './retrieval-conversational.gateway';
import {RepositoriesModule} from "../../repositories/repositories.module";
import {ChainModule} from "../../services/chain/chain.module";

@Module({
  imports: [RepositoriesModule, ChainModule],
  providers: [
    RetrievalConversationalGateway,
    RetrievalConversationalService,
  ],
  controllers: [],
})
export class RetrievalConversationalModule {}
