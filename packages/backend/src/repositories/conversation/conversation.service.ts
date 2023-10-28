import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Conversation, NewConversation } from '@my-monorepo/shared';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async conversations(creatorId: string): Promise<Conversation[]> {
    return this.prisma.conversation.findMany({
      where: {
        creatorId,
      },
    }) as unknown as Promise<Conversation[]>;
  }

  async createConversation(
    creatorId: string,
    data: NewConversation,
  ): Promise<Conversation> {
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
      creator: {
        connect: {
          id: creatorId,
        },
      },
    };

    return this.prisma.conversation.create({
      data: conversationData,
      include: {
        creator: true,
        chatHistory: true,
        bot: {
          include: {
            boundDocument: true,
          },
        },
        document: true,
      },
    }) as unknown as Promise<Conversation>;
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

  async getConversationById(id: number): Promise<Conversation> {
    return this.prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        creator: true,
        chatHistory: {
          orderBy: {
            id: 'asc',
          },
        },
        bot: {
          include: {
            boundDocument: true,
          },
        },
        document: true,
      },
    }) as unknown as Promise<Conversation>;
  }
}
