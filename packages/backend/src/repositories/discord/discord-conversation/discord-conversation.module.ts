import { Module } from '@nestjs/common';
import { DiscordConversationService } from './discord-conversation.service';
import {PrismaModule} from "../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DiscordConversationService],
  exports: [DiscordConversationService]
})
export class DiscordConversationModule {}
