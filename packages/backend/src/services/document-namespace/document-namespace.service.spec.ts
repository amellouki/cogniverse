import { Test, TestingModule } from '@nestjs/testing';
import { DocumentNamespaceService } from './document-namespace.service';

describe('DocumentNamespaceService', () => {
  let service: DocumentNamespaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentNamespaceService],
    }).compile();

    service = module.get<DocumentNamespaceService>(DocumentNamespaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
