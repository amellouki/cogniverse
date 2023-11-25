import { Injectable } from '@nestjs/common';
import { BotEntity } from 'src/repositories/bot/bot.entity';
import { Prisma } from '@prisma/client';
import { Bot, NewBot, UpdatedBot } from '@my-monorepo/shared';

@Injectable()
export class BotService {
  constructor(private botEntity: BotEntity) {}

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
    return this.botEntity.createBot(botData);
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
    return this.botEntity.updateBot(botId, botData);
  }

  deleteBot(botId: number) {
    return this.botEntity.deleteBot(botId);
  }

  getBotById(id: number) {
    return this.botEntity.getBotById(id);
  }

  getBotsByCreatorId(creatorId: string) {
    return this.botEntity.getPublicBotsAndBotsCreatedByUser(creatorId);
  }
}
