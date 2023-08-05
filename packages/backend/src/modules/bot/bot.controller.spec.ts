import { Test, TestingModule } from '@nestjs/testing';
import { BotController } from './bot.controller';

describe('AgentController', () => {
  let controller: BotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
    }).compile();

    controller = module.get<BotController>(BotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
