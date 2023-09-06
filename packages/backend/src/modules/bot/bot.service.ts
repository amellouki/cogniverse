import { Injectable } from '@nestjs/common';
import { BotService as BotRepositoryService } from '../../repositories/bot/bot.service';
import { Prisma } from '@prisma/client';
import { NewBot } from '@my-monorepo/shared';

@Injectable()
export class BotService {
  constructor(private botRepository: BotRepositoryService) {}

  createBot(creatorId: string, newBot: NewBot) {
    const botData: Prisma.BotCreateInput = {
      ...newBot,
      creator: {
        connect: {
          id: creatorId,
        },
      },
    };
    return this.botRepository.createBot(botData);
  }

  getBotById(id: number) {
    return this.botRepository.getBotById(id);
  }

  getBotsByCreatorId(creatorId: string) {
    return this.botRepository.getBotsByCreatorId(creatorId);
  }
}
