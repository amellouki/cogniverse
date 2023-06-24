import { Test, TestingModule } from '@nestjs/testing';
import { PdfEmbeddingController } from './pdf-embedding.controller';

describe('PdfEmbeddingController', () => {
  let controller: PdfEmbeddingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfEmbeddingController],
    }).compile();

    controller = module.get<PdfEmbeddingController>(PdfEmbeddingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
