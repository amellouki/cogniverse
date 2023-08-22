import { Test, TestingModule } from '@nestjs/testing';
import { RetrievalConversationalChainService } from './retrieval-conversational-chain.service';

describe('ChainService', () => {
  let service: RetrievalConversationalChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrievalConversationalChainService],
    }).compile();

    service = module.get<RetrievalConversationalChainService>(
      RetrievalConversationalChainService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
