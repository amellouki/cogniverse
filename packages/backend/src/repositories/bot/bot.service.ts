import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Bot } from '@my-monorepo/shared';

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
        boundDocument: true,
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

  getBotByName(name: string): Prisma.PrismaPromise<Bot> {
    return this.prisma.bot.findUnique({
      where: {
        name,
      },
      include: {
        boundDocument: true,
      },
    }) as unknown as Prisma.PrismaPromise<Bot>;
  }
}
