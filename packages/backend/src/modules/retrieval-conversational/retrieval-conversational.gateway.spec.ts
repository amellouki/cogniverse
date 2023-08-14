import { Test, TestingModule } from '@nestjs/testing';
import { RetrievalConversationalGateway } from './retrieval-conversational.gateway';

describe('ConversationalRetrievalQaController', () => {
  let controller: RetrievalConversationalGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetrievalConversationalGateway],
    }).compile();

    controller = module.get<RetrievalConversationalGateway>(RetrievalConversationalGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
