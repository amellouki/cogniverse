import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ConversationService } from './repositories/conversation/conversation.service';
import { Conversation } from '@prisma/client';
import { SecureRequest } from './types/secure-request';

@Controller('api')
export class AppController {
  constructor(private conversationService: ConversationService) {}

  @Get('conversations')
  async getConversations(
    @Request() request: SecureRequest,
  ): Promise<Conversation[]> {
    const creatorId = request.authPayload.uid;
    return await this.conversationService.conversations(creatorId);
  }

  @Get('conversation/:id')
  async getConversationHistory(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: SecureRequest,
  ): Promise<Conversation> {
    const creatorId = request.authPayload.uid;
    const conversation = await this.conversationService.getConversationById(id);
    if (conversation && conversation.creatorId !== creatorId) {
      throw new UnauthorizedException();
    }

    return conversation;
  }
}
