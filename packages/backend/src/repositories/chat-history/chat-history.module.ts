import { Module } from '@nestjs/common';
import { ChatHistoryEntity } from 'src/repositories/chat-history/chat-history.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChatHistoryEntity],
  exports: [ChatHistoryEntity],
})
export class ChatHistoryModule {}
