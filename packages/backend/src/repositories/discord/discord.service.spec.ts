import { Test, TestingModule } from '@nestjs/testing';
import { DiscordEntity } from 'src/repositories/discord/discord.entity';

describe('DiscordConversationService', () => {
  let service: DiscordEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordEntity],
    }).compile();

    service = module.get<DiscordEntity>(DiscordEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
