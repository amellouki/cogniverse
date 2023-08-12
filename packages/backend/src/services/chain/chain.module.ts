import { Module } from '@nestjs/common';
import { RetrievalConversationalChainService } from './retrieval-conversational-chain.service';
import {VectorStoreModule} from "../vector-store/vector-store.module";

@Module({
  providers: [RetrievalConversationalChainService],
  exports: [RetrievalConversationalChainService],
  imports: [VectorStoreModule]
})
export class ChainModule {}
