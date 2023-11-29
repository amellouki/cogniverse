import { Module } from '@nestjs/common';
import { DiscordEntity } from 'src/repositories/discord/discord.entity';
import { PrismaModule } from 'src/repositories/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DiscordEntity],
  exports: [DiscordEntity],
})
export class DiscordModule {}
