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
    const clonedMessage = { ...message };
    delete clonedMessage.rcId;
    delete clonedMessage.simpleConversationId;
    const messageCreateInput: Prisma.MessageCreateInput = {
      ...clonedMessage,
      rc: {
        connect: {
          id: message.rcId,
        },
      },
    };
    console.log('saving message', messageCreateInput);
    return this.createMessage(messageCreateInput);
  }
}
