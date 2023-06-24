import { Test, TestingModule } from '@nestjs/testing';
import { ConversationalRetrievalQaGateway } from './conversational-retrieval-qa.gateway';

describe('ConversationalRetrievalQaController', () => {
  let controller: ConversationalRetrievalQaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationalRetrievalQaGateway],
    }).compile();

    controller = module.get<ConversationalRetrievalQaGateway>(ConversationalRetrievalQaGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
