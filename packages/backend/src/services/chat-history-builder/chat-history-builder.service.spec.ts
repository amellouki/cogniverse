import { Test, TestingModule } from '@nestjs/testing';
import { ChatHistoryBuilderService } from './chat-history-builder.service';

describe('ChatHistoryBuilderService', () => {
  let service: ChatHistoryBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatHistoryBuilderService],
    }).compile();

    service = module.get<ChatHistoryBuilderService>(ChatHistoryBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
