import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { ChainsModule } from 'src/services/chains/chains.module';
import { ConversationalChainService } from 'src/services/chains/conversational-chain/conversational-chain.service';
import { ChatHistoryBuilderModule } from 'src/services/chat-history-builder/chat-history-builder.module';
import { RetrievalConversationalService } from './services/retrieval-conversational.service';
import { CompletionGateway } from './completion.gateway';
import { AgentService } from './services/agent.service';
import { ConversationalService } from './services/conversational.service';
import { ChainStreamService } from './services/chain-stream.service';

@Module({
  imports: [RepositoriesModule, ChainsModule, ChatHistoryBuilderModule],
  providers: [
    CompletionGateway,
    RetrievalConversationalService,
    ConversationalChainService,
    AgentService,
    ConversationalService,
    ChainStreamService,
  ],
  controllers: [],
})
export class CompletionModule {}
