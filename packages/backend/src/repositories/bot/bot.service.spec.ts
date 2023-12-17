import { Test, TestingModule } from '@nestjs/testing';
import { BotRepository } from 'src/repositories/bot/bot.repository';

describe('AgentService', () => {
  let service: BotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotRepository],
    }).compile();

    service = module.get<BotRepository>(BotRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
