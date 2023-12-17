import { Test, TestingModule } from '@nestjs/testing';
import { ConversationRepository } from 'src/repositories/conversation/conversation.repository';

describe('ConversationService', () => {
  let service: ConversationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationRepository],
    }).compile();

    service = module.get<ConversationRepository>(ConversationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
