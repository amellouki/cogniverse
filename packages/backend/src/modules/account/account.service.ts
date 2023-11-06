import { Injectable } from '@nestjs/common';
import { AccountKeys } from '@my-monorepo/shared';
import { AccountService as AccountRepository } from '../../repositories/account/account.service';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  updateKeys(botId: string, body: AccountKeys) {
    return this.accountRepository.updateKeys(botId, body);
  }
}
