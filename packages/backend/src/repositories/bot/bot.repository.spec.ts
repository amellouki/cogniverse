import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { prismaClientMock, BOT_REPO } from 'cogniverse-backend/mocks';
import { BotRepository } from './bot.repository';

describe('AgentService', () => {
  let service: BotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotRepository,
        {
          provide: PrismaService,
          useValue: prismaClientMock,
        },
      ],
    }).compile();

    service = module.get<BotRepository>(BotRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create bot', async () => {
    prismaClientMock.bot.create.mockResolvedValueOnce(BOT_REPO.GET as any);
    const created = await service.createBot(BOT_REPO.CREATE as any);
    expect(created).toEqual(BOT_REPO.GET);
  });

  it('should delete bot', async () => {
    prismaClientMock.bot.delete.mockResolvedValueOnce(BOT_REPO.GET as any);
    const deleted = await service.deleteBot(BOT_REPO.ID);
    expect(deleted).toEqual(BOT_REPO.GET);
  });

  it('should get bot', async () => {
    prismaClientMock.bot.findUnique.mockResolvedValueOnce(BOT_REPO.GET as any);
    const got = await service.getBotById(BOT_REPO.ID);
    expect(got).toEqual(BOT_REPO.GET);
  });
});
