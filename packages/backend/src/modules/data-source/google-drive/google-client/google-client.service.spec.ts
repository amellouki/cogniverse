import { Test, TestingModule } from '@nestjs/testing';
import { GoogleClientService } from './google-client.service';

describe('GoogleClientService', () => {
  let service: GoogleClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleClientService],
    }).compile();

    service = module.get<GoogleClientService>(GoogleClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
