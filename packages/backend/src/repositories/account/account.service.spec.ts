import { Test, TestingModule } from '@nestjs/testing';
import { AccountEntity } from 'src/repositories/account/account.entity';

describe('AccountService', () => {
  let service: AccountEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountEntity],
    }).compile();

    service = module.get<AccountEntity>(AccountEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
