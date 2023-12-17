import { Test, TestingModule } from '@nestjs/testing';
import { SlackRepository } from 'src/repositories/slack/slack.repository';

describe('SlackService', () => {
  let service: SlackRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackRepository],
    }).compile();

    service = module.get<SlackRepository>(SlackRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
