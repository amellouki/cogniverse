import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { DocumentMetadataModule } from './document-metadata/document-metadata.module';
import { BotModule } from './bot/bot.module';
import { AccountModule } from './account/account.module';
import { SlackModule } from './slack/slack.module';

const repositoryModules = [
  ConversationModule,
  ChatHistoryModule,
  DocumentMetadataModule,
  BotModule,
  AccountModule,
  SlackModule,
];

@Module({
  imports: repositoryModules,
  exports: repositoryModules,
  providers: [],
})
export class RepositoriesModule {}
