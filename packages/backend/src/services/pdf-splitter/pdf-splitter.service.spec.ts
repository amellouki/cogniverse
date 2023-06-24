import { Test, TestingModule } from '@nestjs/testing';
import { PdfSplitterService } from './pdf-splitter.service';

describe('PdfSplitterService', () => {
  let service: PdfSplitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfSplitterService],
    }).compile();

    service = module.get<PdfSplitterService>(PdfSplitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
