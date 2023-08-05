import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BotService {
  constructor(private prisma: PrismaService) {}
  createBot(data: Prisma.BotCreateInput) {
    return this.prisma.bot.create({ data });
  }

  getBotById(id: number) {
    this.prisma.bot.findUnique({
      where: {
        id,
      },
      include: {
        retrievalLanguageModel: true,
        conversationModel: true,
      },
    });
  }

  getBots() {
    return this.prisma.bot.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
