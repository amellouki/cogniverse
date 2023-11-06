import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackModule as SlackRepoModule } from '../../repositories/slack/slack.module';
import { ChainsModule } from '../../services/chains/chains.module';
import { BotModule } from '../../repositories/bot/bot.module';
import { ChatHistoryBuilderModule } from '../../services/chat-history-builder/chat-history-builder.module';

@Module({
  imports: [SlackRepoModule, ChainsModule, BotModule, ChatHistoryBuilderModule],
  providers: [SlackService],
})
export class SlackModule {}
