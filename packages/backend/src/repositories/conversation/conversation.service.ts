import { Injectable } from '@nestjs/common';
import { RCConversation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import NewConversation from '@my-monorepo/shared/dist/types/new-conversation';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async conversations(): Promise<RCConversation[]> {
    return this.prisma.rCConversation.findMany();
  }

  async createRCConversation(data: NewConversation): Promise<RCConversation> {
    const conversationData: Prisma.RCConversationCreateInput = {
      title: data.title,
      chatHistory: {
        create: [],
      },
      rcAgent: {
        connect: {
          id: data.agentId,
        },
      },
      document: {
        connect: {
          id: data.documentId,
        },
      },
    };

    return this.prisma.rCConversation.create({
      data: conversationData,
      include: {
        chatHistory: true,
        rcAgent: true,
        document: true,
      },
    });
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
        rcAgent: true,
        document: true,
      },
    });
  }
}
