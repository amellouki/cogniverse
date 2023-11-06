import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { SlackConversation, SlackMessage } from '@my-monorepo/shared';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);

  constructor(private prisma: PrismaService) {}

  async saveMessage(message: SlackMessage) {
    const cloned = { ...message };
    delete cloned.slackConversationId;
    const messageCreateInput: Prisma.SlackMessageCreateInput = {
      ...message,
    };
    await this.prisma.slackConversation.upsert({
      where: {
        id: message.slackConversationId,
      },
      update: {},
      create: {
        id: message.slackConversationId,
        chatHistory: {
          create: [],
        },
      },
    });
    try {
      return await this.prisma.slackMessage.create({
        data: messageCreateInput,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getConversationById(id: string): Promise<SlackConversation> {
    return this.prisma.slackConversation.findUnique({
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
    }) as unknown as SlackConversation;
  }
}
