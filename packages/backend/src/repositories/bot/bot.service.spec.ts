import { Test, TestingModule } from '@nestjs/testing';
import { BotEntity } from 'src/repositories/bot/bot.entity';

describe('AgentService', () => {
  let service: BotEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotEntity],
    }).compile();

    service = module.get<BotEntity>(BotEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
