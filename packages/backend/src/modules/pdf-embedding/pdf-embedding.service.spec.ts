import { Test, TestingModule } from '@nestjs/testing';
import { PdfEmbeddingService } from './pdf-embedding.service';

describe('PdfEmbeddingService', () => {
  let service: PdfEmbeddingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfEmbeddingService],
    }).compile();

    service = module.get<PdfEmbeddingService>(PdfEmbeddingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
