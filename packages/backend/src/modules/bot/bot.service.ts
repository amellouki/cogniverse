import { Injectable } from '@nestjs/common';
import { BotRepository } from 'src/repositories/bot/bot.repository';
import { Prisma } from '@prisma/client';
import { Bot, NewBot, UpdatedBot } from '@my-monorepo/shared';

@Injectable()
export class BotService {
  constructor(private botRepository: BotRepository) {}

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

  updateBot(creatorId: string, botId: number, bot: UpdatedBot) {
    const copy = { ...bot };
    delete copy.id;
    delete copy.boundDocumentId;
    const botData: Prisma.BotUpdateInput = {
      ...copy,
      boundDocument: bot.boundDocumentId
        ? { connect: { id: bot.boundDocumentId } }
        : { disconnect: true },
    };
    return this.botRepository.updateBot(botId, botData);
  }

  deleteBot(botId: number) {
    return this.botRepository.deleteBot(botId);
  }

  getBotById(id: number) {
    return this.botRepository.getBotById(id);
  }

  getBotsByCreatorId(creatorId: string) {
    return this.botRepository.getPublicBotsAndBotsCreatedByUser(creatorId);
  }
}
