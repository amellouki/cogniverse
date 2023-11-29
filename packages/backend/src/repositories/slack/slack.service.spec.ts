import { Test, TestingModule } from '@nestjs/testing';
import { SlackEntity } from 'src/repositories/slack/slack.entity';

describe('SlackService', () => {
  let service: SlackEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackEntity],
    }).compile();

    service = module.get<SlackEntity>(SlackEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
