import { Test, TestingModule } from '@nestjs/testing';
import { ConversationalChainService } from './conversational-chain.service';

describe('ConversationalService', () => {
  let service: ConversationalChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationalChainService],
    }).compile();

    service = module.get<ConversationalChainService>(
      ConversationalChainService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
