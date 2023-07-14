import { Test, TestingModule } from '@nestjs/testing';
import { DocumentMetadataService } from './document-metadata.service';

describe('DocumentMetadataService', () => {
  let service: DocumentMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentMetadataService],
    }).compile();

    service = module.get<DocumentMetadataService>(DocumentMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
