import { Test, TestingModule } from '@nestjs/testing';
import { AccountRepository } from 'src/repositories/account/account.repository';

describe('AccountService', () => {
  let service: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRepository],
    }).compile();

    service = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
