import { Test, TestingModule } from '@nestjs/testing';
import { GenerationGateway } from 'src/modules/generation/generation.gateway';

describe('ConversationalRetrievalQaController', () => {
  let controller: GenerationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerationGateway],
    }).compile();

    controller = module.get<GenerationGateway>(GenerationGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
