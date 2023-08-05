import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { DocumentMetadataModule } from './document-metadata/document-metadata.module';
import { BotModule } from './bot/bot.module';

const repositoryModules = [
  ConversationModule,
  ChatHistoryModule,
  DocumentMetadataModule,
  BotModule,
];

@Module({
  imports: repositoryModules,
  exports: repositoryModules,
})
export class RepositoriesModule {}
