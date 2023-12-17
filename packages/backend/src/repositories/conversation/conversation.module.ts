import { Module } from '@nestjs/common';
import { ConversationRepository } from 'src/repositories/conversation/conversation.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ConversationRepository],
  exports: [ConversationRepository],
})
export class ConversationModule {}
