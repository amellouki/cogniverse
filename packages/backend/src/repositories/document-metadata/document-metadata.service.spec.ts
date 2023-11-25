import { Test, TestingModule } from '@nestjs/testing';
import { DocumentMetadataEntity } from 'src/repositories/document-metadata/document-metadata.entity';

describe('DocumentMetadataService', () => {
  let service: DocumentMetadataEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentMetadataEntity],
    }).compile();

    service = module.get<DocumentMetadataEntity>(DocumentMetadataEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
