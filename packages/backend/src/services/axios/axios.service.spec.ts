import { Test, TestingModule } from '@nestjs/testing';
import { AxiosService } from './axios.service';

describe('AxiosService', () => {
  let service: AxiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosService],
    }).compile();

    service = module.get<AxiosService>(AxiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
