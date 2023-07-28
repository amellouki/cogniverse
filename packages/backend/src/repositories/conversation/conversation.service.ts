import { Injectable } from '@nestjs/common';
import { RCConversation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async conversations(): Promise<RCConversation[]> {
    return this.prisma.rCConversation.findMany();
  }

  async createRCConversation(
    data: Prisma.RCConversationCreateInput,
  ): Promise<RCConversation> {
    return this.prisma.rCConversation.create({ data });
  }
  async rcConversationHistory(id: number) {
    return this.prisma.rCConversation.findUnique({
      where: {
        id: id,
      },
      include: {
        chatHistory: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async getRcConversationById(id: number) {
    return this.prisma.rCConversation.findUnique({
      where: {
        id,
      },
      include: {
        chatHistory: {
          orderBy: {
            id: 'asc',
          },
        },
        rcAgent: {
          include: {
            retrievalLanguageModel: true,
            conversationModel: true,
          },
        },
        document: true,
      },
    });
  }
}
