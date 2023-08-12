import { Test, TestingModule } from '@nestjs/testing';
import { VectorStoreService } from './vector-store.service';

describe('VectorStoreService', () => {
  let service: VectorStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VectorStoreService],
    }).compile();

    service = module.get<VectorStoreService>(VectorStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
