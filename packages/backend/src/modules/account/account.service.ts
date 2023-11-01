import { Injectable } from '@nestjs/common';
import { UpdateAccountKeys } from '@my-monorepo/shared';
import { AccountService as AccountRepository } from '../../repositories/account/account.service';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  updateKeys(botId: string, body: UpdateAccountKeys) {
    return this.accountRepository.updateKeys(botId, body);
  }
}
