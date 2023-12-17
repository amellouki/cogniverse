import { Test, TestingModule } from '@nestjs/testing';
import { DocumentMetadataRepository } from 'src/repositories/document-metadata/document-metadata.repository';

describe('DocumentMetadataService', () => {
  let service: DocumentMetadataRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentMetadataRepository],
    }).compile();

    service = module.get<DocumentMetadataRepository>(
      DocumentMetadataRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
