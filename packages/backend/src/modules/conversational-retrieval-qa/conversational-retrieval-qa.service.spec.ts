import { Test, TestingModule } from '@nestjs/testing';
import { ConversationalRetrievalQaService } from './conversational-retrieval-qa.service';

describe('ConversationalRetrievalQaService', () => {
  let service: ConversationalRetrievalQaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConversationalRetrievalQaService],
    }).compile();

    service = module.get<ConversationalRetrievalQaService>(ConversationalRetrievalQaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
