import { Test, TestingModule } from '@nestjs/testing';
import { DiscordAppService } from './discord-app.service';

describe('DiscordService', () => {
  let service: DiscordAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordAppService],
    }).compile();

    service = module.get<DiscordAppService>(DiscordAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
