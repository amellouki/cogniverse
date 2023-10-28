import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FullBot } from '@my-monorepo/shared';

@Injectable()
export class BotService {
  constructor(private prisma: PrismaService) {}

  createBot(data: Prisma.BotCreateInput) {
    return this.prisma.bot.create({ data });
  }

  updateBot(botId: number, bot: Prisma.BotUpdateInput) {
    return this.prisma.bot.update({
      data: bot,
      where: {
        id: botId,
      },
    });
  }

  deleteBot(botId: number) {
    return this.prisma.bot.delete({
      where: {
        id: botId,
      },
    });
  }

  async getBotById(id: number) {
    return this.prisma.bot.findUnique({
      where: {
        id,
      },
      include: {
        boundDocument: true,
      },
    });
  }

  getBotsByCreatorId(creatorId: string) {
    return this.prisma.bot.findMany({
      where: {
        creatorId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  getPublicBotsAndBotsCreatedByUser(userId: string) {
    return this.prisma.bot.findMany({
      where: {
        OR: [
          {
            creatorId: userId,
          },
          {
            public: true,
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  getBotByName(name: string): Prisma.PrismaPromise<FullBot> {
    return this.prisma.bot.findUnique({
      where: {
        name,
      },
      include: {
        creator: true,
        boundDocument: true,
      },
    }) as unknown as Prisma.PrismaPromise<FullBot>;
  }
}
