import { Test, TestingModule } from '@nestjs/testing';
import { DiscordConversationService } from './discord-conversation.service';

describe('DiscordConversationService', () => {
  let service: DiscordConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordConversationService],
    }).compile();

    service = module.get<DiscordConversationService>(DiscordConversationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
