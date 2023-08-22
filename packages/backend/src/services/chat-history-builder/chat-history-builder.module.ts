import { Module } from '@nestjs/common';
import { ChatHistoryBuilderService } from './chat-history-builder.service';

@Module({
  providers: [ChatHistoryBuilderService],
  exports: [ChatHistoryBuilderService],
})
export class ChatHistoryBuilderModule {}
