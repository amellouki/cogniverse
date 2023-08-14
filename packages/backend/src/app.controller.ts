import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConversationService } from './repositories/conversation/conversation.service';
import { ChatHistoryService } from './repositories/chat-history/chat-history.service';
import { Message, Prisma, Conversation } from '@prisma/client';
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
  ): Promise<Conversation> {
    return this.conversationService.createConversation(request);
  }

  @Get('conversations')
  async getConversations(): Promise<Conversation[]> {
    return this.conversationService.conversations();
  }

  @Get('conversation')
  async getConversationHistory(
    @Query('id') id: string,
  ): Promise<Conversation> {
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
