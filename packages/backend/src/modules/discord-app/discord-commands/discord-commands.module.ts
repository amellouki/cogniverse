import { Module } from '@nestjs/common';
import { CvService } from './cv/cv.service';
import { DiscordModule } from 'src/repositories/discord/discord.module';
import { ChainsModule } from 'src/services/chains/chains.module';
import { BotModule } from 'src/repositories/bot/bot.module';
import { ChatHistoryBuilderModule } from 'src/services/chat-history-builder/chat-history-builder.module';
import { VectorStoreModule } from 'src/services/vector-store/vector-store.module';
import { ResetHistoryService } from './reset-history/reset-history.service';

export const commands = [CvService, ResetHistoryService];

@Module({
  imports: [
    DiscordModule,
    ChainsModule,
    BotModule,
    ChatHistoryBuilderModule,
    VectorStoreModule,
  ],
  providers: commands,
  exports: commands,
})
export class DiscordCommandsModule {}
