import { Module } from '@nestjs/common';
import { DiscordAppService } from './discord-app.service';
import { DiscordConversationModule } from '../../repositories/discord/discord-conversation/discord-conversation.module';
import { ChainsModule } from '../../services/chains/chains.module';
import { BotModule } from '../../repositories/bot/bot.module';
import { ChatHistoryBuilderModule } from '../../services/chat-history-builder/chat-history-builder.module';

@Module({
  imports: [
    DiscordConversationModule,
    ChainsModule,
    BotModule,
    ChatHistoryBuilderModule,
  ],
  providers: [DiscordAppService],
  exports: [DiscordAppService],
})
export class DiscordAppModule {}
