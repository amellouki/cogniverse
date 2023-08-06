import { Injectable } from '@nestjs/common';
import { BotService as AgentRepositoryService } from '../../repositories/bot/bot.service';
import { Prisma } from '@prisma/client';
import { NewBot } from '@my-monorepo/shared';

@Injectable()
export class BotService {
  constructor(private agent: AgentRepositoryService) {}

  createBot(newBot: NewBot) {
    const botData: Prisma.BotCreateInput = { ...newBot };
    return this.agent.createBot(botData);
  }

  getRcAgentById(id: number) {
    return this.agent.getBotById(id);
  }

  getAgents() {
    return this.agent.getBots();
  }
}
