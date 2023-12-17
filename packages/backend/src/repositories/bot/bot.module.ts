import { Module } from '@nestjs/common';
import { BotRepository } from 'src/repositories/bot/bot.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BotRepository],
  exports: [BotRepository],
})
export class BotModule {}
