import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ConversationService } from './repositories/conversation/conversation.service';
import { ChatHistoryService } from './repositories/chat-history/chat-history.service';
import { Conversation, Message, Prisma } from '@prisma/client';
import CreateConversationRequestDto from './dto/create-conversation-request.dto';
import AppendMessageRequestDto from './dto/append-message-request.dto';
import { SecureRequest } from './types/secure-request';

@Controller('api')
export class AppController {
  constructor(
    private conversationService: ConversationService,
    private historyService: ChatHistoryService,
  ) {}

  @Post('/create_conversation')
  async createConversation(
    @Body() data: CreateConversationRequestDto,
    @Request() request: SecureRequest,
  ): Promise<Conversation> {
    const creatorId = request.authPayload.uid;
    return this.conversationService.createConversation(creatorId, data);
  }

  @Get('conversations')
  async getConversations(
    @Request() request: SecureRequest,
  ): Promise<Conversation[]> {
    const creatorId = request.authPayload.uid;
    return await this.conversationService.conversations(creatorId);
  }

  @Get('conversation')
  async getConversationHistory(@Query('id') id: string): Promise<Conversation> {
    return this.conversationService.getConversationById(Number(id));
  }

  @Post('append-to-history')
  async appendMessage(
    @Body() request: AppendMessageRequestDto,
  ): Promise<Message> {
    const messageCreateInput: Prisma.MessageCreateInput = {
      ...request,
      conversation: {
        connect: {
          id: request.conversationId,
        },
      },
    };
    return this.historyService.createMessage(messageCreateInput);
  }
}
