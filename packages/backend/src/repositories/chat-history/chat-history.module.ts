import { Module } from '@nestjs/common';
import { ChatHistoryRepository } from 'src/repositories/chat-history/chat-history.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChatHistoryRepository],
  exports: [ChatHistoryRepository],
})
export class ChatHistoryModule {}
