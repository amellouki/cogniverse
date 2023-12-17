import { Test, TestingModule } from '@nestjs/testing';
import { ChatHistoryRepository } from 'src/repositories/chat-history/chat-history.repository';

describe('HistoryService', () => {
  let service: ChatHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatHistoryRepository],
    }).compile();

    service = module.get<ChatHistoryRepository>(ChatHistoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
