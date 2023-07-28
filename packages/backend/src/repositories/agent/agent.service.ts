import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgentService {
  constructor(private prisma: PrismaService) {}
  createRcAgent(data: Prisma.RCAgentCreateInput) {
    return this.prisma.rCAgent.create({ data });
  }

  getRcAgentById(id: number) {
    this.prisma.rCAgent.findUnique({
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
    return this.prisma.rCAgent.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
