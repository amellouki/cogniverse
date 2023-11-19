import { Module } from '@nestjs/common';
import { RetrievalConversationalService } from './retrieval-conversational.service';
import { CompletionGateway } from 'src/modules/completion/completion.gateway';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { ChainsModule } from '../../services/chains/chains.module';
import { ConversationalChainService } from '../../services/chains/conversational-chain/conversational-chain.service';
import { AgentService } from './agent.service';
import { ConversationalService } from './conversational.service';
import { ChatHistoryBuilderModule } from '../../services/chat-history-builder/chat-history-builder.module';

@Module({
  imports: [RepositoriesModule, ChainsModule, ChatHistoryBuilderModule],
  providers: [
    CompletionGateway,
    RetrievalConversationalService,
    ConversationalChainService,
    AgentService,
    ConversationalService,
  ],
  controllers: [],
})
export class CompletionModule {}
