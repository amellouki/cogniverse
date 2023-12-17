import { Module } from '@nestjs/common';
import { DiscordRepository } from 'src/repositories/discord/discord.repository';
import { PrismaModule } from 'src/repositories/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DiscordRepository],
  exports: [DiscordRepository],
})
export class DiscordModule {}
