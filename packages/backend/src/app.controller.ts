import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConversationService } from './repositories/conversation/conversation.service';
import { ChatHistoryService } from './repositories/chat-history/chat-history.service';
import { Message, Prisma, RCConversation } from '@prisma/client';
import CreateConversationRequestDto from './dto/create-conversation-request.dto';
import AppendMessageRequestDto from './dto/append-message-request.dto';

@Controller('api')
export class AppController {
  constructor(
    private conversationService: ConversationService,
    private historyService: ChatHistoryService,
  ) {}

  @Post('/create_conversation')
  async createConversation(
    @Body() request: CreateConversationRequestDto,
  ): Promise<RCConversation> {
    return this.conversationService.createRCConversation(request);
  }

  @Get('conversations')
  async getConversations(): Promise<RCConversation[]> {
    return this.conversationService.conversations();
  }

  @Get('conversation')
  async getConversationHistory(
    @Query('id') id: string,
  ): Promise<RCConversation> {
    return this.conversationService.getRcConversationById(Number(id));
  }

  @Post('append-to-history')
  async appendMessage(
    @Body() request: AppendMessageRequestDto,
  ): Promise<Message> {
    const messageCreateInput: Prisma.MessageCreateInput = {
      ...request,
      rc: {
        connect: {
          id: request.rcId,
        },
      },
    };
    return this.historyService.createMessage(messageCreateInput);
  }
}
