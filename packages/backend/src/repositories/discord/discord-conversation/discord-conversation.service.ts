import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DiscordMessage, Prisma } from '@prisma/client';
import { DiscordConversation } from '@my-monorepo/shared';

@Injectable()
export class DiscordConversationService {
  private readonly logger = new Logger(DiscordConversationService.name);

  constructor(private prisma: PrismaService) {}

  async saveMessage(message: DiscordMessage) {
    const cloned = { ...message };
    delete cloned.discordConversationId;
    const messageCreateInput: Prisma.DiscordMessageCreateInput = {
      ...message,
    };
    await this.prisma.discordConversation.upsert({
      where: {
        id: message.discordConversationId,
      },
      update: {},
      create: {
        id: message.discordConversationId,
        chatHistory: {
          create: [],
        },
      },
    });
    try {
      return await this.prisma.discordMessage.create({
        data: messageCreateInput,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getConversationById(id: string): Promise<DiscordConversation> {
    return this.prisma.discordConversation.findUnique({
      where: {
        id,
      },
      include: {
        chatHistory: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    }) as unknown as DiscordConversation;
  }
}
