import { Test, TestingModule } from '@nestjs/testing';
import { PineconeService } from './pinecone.service';

describe('PineconeService', () => {
  let service: PineconeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PineconeService],
    }).compile();

    service = module.get<PineconeService>(PineconeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
