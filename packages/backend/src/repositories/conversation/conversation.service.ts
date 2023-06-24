import { Injectable } from '@nestjs/common';
import { Conversation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async conversations(): Promise<Conversation[]> {
    return this.prisma.conversation.findMany();
  }

  async createConversation(
    data: Prisma.ConversationCreateInput,
  ): Promise<Conversation> {
    return this.prisma.conversation.create({ data });
  }
  async conversationHistory(id: number) {
    return this.prisma.conversation.findUnique({
      where: {
        id: id,
      },
      include: {
        ChatHistory: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async getConversationById(id: number) {
    return this.prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        ChatHistory: {
          orderBy: {
            id: 'asc',
          },
        },
        conversationModel: true,
        retrievalLanguageModel: true,
      },
    });
  }
}
