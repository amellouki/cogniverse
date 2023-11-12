import { Test, TestingModule } from '@nestjs/testing';
import { ResetHistoryService } from './reset-history.service';

describe('ResetHistoryService', () => {
  let service: ResetHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetHistoryService],
    }).compile();

    service = module.get<ResetHistoryService>(ResetHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
