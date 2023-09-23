import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
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
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
