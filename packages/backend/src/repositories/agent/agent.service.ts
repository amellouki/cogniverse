import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgentService {
  constructor(private prisma: PrismaService) {}
  createRcAgent(data: Prisma.BotCreateInput) {
    return this.prisma.bot.create({ data });
  }

  getRcAgentById(id: number) {
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

  getAgents() {
    return this.prisma.bot.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
