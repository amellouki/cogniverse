import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { DocumentMetadataModule } from './document-metadata/document-metadata.module';

@Module({
  imports: [ConversationModule, ChatHistoryModule, DocumentMetadataModule],
  exports: [ConversationModule, ChatHistoryModule, DocumentMetadataModule],
})
export class RepositoriesModule {}
