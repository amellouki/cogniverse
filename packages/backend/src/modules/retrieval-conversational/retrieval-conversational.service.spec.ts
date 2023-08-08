import { Test, TestingModule } from '@nestjs/testing';
import { RetrievalConversationalService } from './retrieval-conversational.service';

describe('ConversationalRetrievalQaService', () => {
  let service: RetrievalConversationalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrievalConversationalService],
    }).compile();

    service = module.get<RetrievalConversationalService>(RetrievalConversationalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
