import { Injectable } from '@nestjs/common';
import { AccountKeys } from '@my-monorepo/shared';
import { AccountRepository } from 'src/repositories/account/account.repository';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  updateKeys(botId: string, body: AccountKeys) {
    return this.accountRepository.updateKeys(botId, body);
  }
}
