import { Test, TestingModule } from '@nestjs/testing';
import { SlackAppService } from './slack-app.service';

describe('SlackService', () => {
  let service: SlackAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackAppService],
    }).compile();

    service = module.get<SlackAppService>(SlackAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
