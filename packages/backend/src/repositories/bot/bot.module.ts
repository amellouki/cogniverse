import { Module } from '@nestjs/common';
import { BotEntity } from 'src/repositories/bot/bot.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BotEntity],
  exports: [BotEntity],
})
export class BotModule {}
