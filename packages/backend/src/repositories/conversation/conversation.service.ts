import { Injectable } from '@nestjs/common';
import { Conversation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NewConversation } from '@my-monorepo/shared';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async conversations(): Promise<Conversation[]> {
    return this.prisma.conversation.findMany();
  }

  async createConversation(data: NewConversation): Promise<Conversation> {
    const conversationData: Prisma.ConversationCreateInput = {
      title: data.title,
      chatHistory: {
        create: [],
      },
      bot: {
        connect: {
          id: data.botId,
        },
      },
      document: data.documentId && {
        connect: {
          id: data.documentId,
        },
      },
    };

    return this.prisma.conversation.create({
      data: conversationData,
      include: {
        chatHistory: true,
        bot: true,
        document: true,
      },
    });
  }
  async conversationHistory(id: number) {
    return this.prisma.conversation.findUnique({
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

  async getConversationById(id: number) {
    return this.prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        chatHistory: {
          orderBy: {
            id: 'asc',
          },
        },
        bot: true,
        document: true,
      },
    });
  }
}
