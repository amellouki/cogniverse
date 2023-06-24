import { Module } from '@nestjs/common';
import { ChatSessionController } from './chat-session.controller';

@Module({
  controllers: [ChatSessionController],
})
export class ChatSessionModule {}
