import { Module } from '@nestjs/common';
import { RetrievalConversationalService } from './retrieval-conversational.service';
import { RetrievalConversationalGateway } from './retrieval-conversational.gateway';
import {RepositoriesModule} from "../../repositories/repositories.module";
import {ChainsModule} from "../../services/chains/chains.module";
import {ConversationalChainService} from "../../services/chains/conversational-chain/conversational-chain.service";
import {ConversationalService} from "./conversational.service";

@Module({
  imports: [RepositoriesModule, ChainsModule],
  providers: [
    RetrievalConversationalGateway,
    RetrievalConversationalService,
    ConversationalChainService,
    ConversationalService,
  ],
  controllers: [],
})
export class RetrievalConversationalModule {}
