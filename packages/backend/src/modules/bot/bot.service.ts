import { Injectable } from '@nestjs/common';
import { BotService as BotRepositoryService } from '../../repositories/bot/bot.service';
import { Prisma } from '@prisma/client';
import { Bot, NewBot } from '@my-monorepo/shared';

@Injectable()
export class BotService {
  constructor(private botRepository: BotRepositoryService) {}

  createBot(creatorId: string, newBot: NewBot) {
    const copy = { ...newBot };
    delete copy.boundDocumentId;
    const botData: Prisma.BotCreateInput = {
      ...copy,
      boundDocument: newBot.boundDocumentId
        ? { connect: { id: newBot.boundDocumentId } }
        : undefined,
      creator: {
        connect: {
          id: creatorId,
        },
      },
    };
    return this.botRepository.createBot(botData);
  }

  updateBot(bot: Bot) {
    const botId = bot.id;
    const copy = { ...bot };
    delete copy.id;
    delete copy.boundDocumentId;
    const botData: Prisma.BotUpdateInput = {
      ...copy,
      boundDocument: bot.boundDocumentId
        ? { connect: { id: bot.boundDocumentId } }
        : undefined,
    };
    return this.botRepository.updateBot(botData, botId);
  }

  getBotById(id: number) {
    return this.botRepository.getBotById(id);
  }

  getBotsByCreatorId(creatorId: string) {
    return this.botRepository.getBotsByCreatorId(creatorId);
  }
}
