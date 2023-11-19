import { Module } from '@nestjs/common';
import { RetrievalConversationalChainService } from './retrieval-conversational/retrieval-conversational-chain.service';
import { VectorStoreModule } from '../vector-store/vector-store.module';
import { ConversationalChainService } from './conversational-chain/conversational-chain.service';
import { ChatHistoryBuilderModule } from '../chat-history-builder/chat-history-builder.module';
import { AgentService } from './agent/agent.service';

@Module({
  providers: [
    RetrievalConversationalChainService,
    ConversationalChainService,
    AgentService,
  ],
  exports: [
    RetrievalConversationalChainService,
    ConversationalChainService,
    AgentService,
  ],
  imports: [VectorStoreModule, ChatHistoryBuilderModule],
})
export class ChainsModule {}
