import { Module } from '@nestjs/common';
import { SlackAppService } from './slack-app.service';
import { SlackModule as SlackRepoModule } from '../../repositories/slack/slack.module';
import { ChainsModule } from '../../services/chains/chains.module';
import { BotModule } from '../../repositories/bot/bot.module';
import { ChatHistoryBuilderModule } from '../../services/chat-history-builder/chat-history-builder.module';
import { VectorStoreModule } from '../../services/vector-store/vector-store.module';

@Module({
  imports: [
    SlackRepoModule,
    ChainsModule,
    BotModule,
    ChatHistoryBuilderModule,
    VectorStoreModule,
  ],
  providers: [SlackAppService],
})
export class SlackAppModule {}
