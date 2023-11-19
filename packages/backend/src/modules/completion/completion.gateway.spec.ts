import { Test, TestingModule } from '@nestjs/testing';
import { CompletionGateway } from 'src/modules/completion/completion.gateway';

describe('ConversationalRetrievalQaController', () => {
  let controller: CompletionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletionGateway],
    }).compile();

    controller = module.get<CompletionGateway>(CompletionGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
