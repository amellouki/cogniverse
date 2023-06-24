import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import AppendMessageRequestDto from '../../dto/append-message-request.dto';

@Injectable()
export class ChatHistoryService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prismaService.message.create({
      data,
    });
  }

  async updateMessageById(
    id: number,
    data: Prisma.MessageUpdateInput,
  ): Promise<Message> {
    return this.prismaService.message.update({
      where: {
        id,
      },
      data,
    });
  }

  async saveMessage(message: AppendMessageRequestDto): Promise<Message> {
    const cloneMessage = { ...message };
    delete cloneMessage.conversationId;
    const messageCreateInput: Prisma.MessageCreateInput = {
      ...cloneMessage,
      conversation: {
        connect: {
          id: message.conversationId,
        },
      },
    };
    return this.createMessage(messageCreateInput);
  }
}
