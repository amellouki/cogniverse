import { Test, TestingModule } from '@nestjs/testing';
import { ChatSessionController } from './chat-session.controller';

describe('ChatSessionController', () => {
  let controller: ChatSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatSessionController],
    }).compile();

    controller = module.get<ChatSessionController>(ChatSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
