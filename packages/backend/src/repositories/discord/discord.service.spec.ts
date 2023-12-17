import { Test, TestingModule } from '@nestjs/testing';
import { DiscordRepository } from 'src/repositories/discord/discord.repository';

describe('DiscordConversationService', () => {
  let service: DiscordRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordRepository],
    }).compile();

    service = module.get<DiscordRepository>(DiscordRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
