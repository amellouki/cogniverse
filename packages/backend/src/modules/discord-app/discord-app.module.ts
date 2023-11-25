import { Module } from '@nestjs/common';
import { DiscordAppService } from './discord-app.service';
import { DiscordModule } from 'src/repositories/discord/discord.module';
import { ChainsModule } from 'src/services/chains/chains.module';
import { BotModule } from 'src/repositories/bot/bot.module';
import { ChatHistoryBuilderModule } from 'src/services/chat-history-builder/chat-history-builder.module';
import { DiscordCommandsModule } from './discord-commands/discord-commands.module';
import { VectorStoreModule } from 'src/services/vector-store/vector-store.module';

@Module({
  imports: [
    DiscordModule,
    ChainsModule,
    BotModule,
    ChatHistoryBuilderModule,
    DiscordCommandsModule,
    VectorStoreModule,
  ],
  providers: [DiscordAppService],
  exports: [DiscordAppService],
})
export class DiscordAppModule {}
