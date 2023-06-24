import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';

@Module({
  imports: [ConversationModule, ChatHistoryModule],
  exports: [ConversationModule, ChatHistoryModule],
})
export class RepositoriesModule {}
