import { Test, TestingModule } from '@nestjs/testing';
import { ChatHistoryEntity } from 'src/repositories/chat-history/chat-history.entity';

describe('HistoryService', () => {
  let service: ChatHistoryEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatHistoryEntity],
    }).compile();

    service = module.get<ChatHistoryEntity>(ChatHistoryEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
