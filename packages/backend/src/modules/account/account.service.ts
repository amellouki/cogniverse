import { Injectable } from '@nestjs/common';
import { AccountKeys } from '@my-monorepo/shared';
import { AccountEntity } from 'src/repositories/account/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountEntity: AccountEntity) {}

  updateKeys(botId: string, body: AccountKeys) {
    return this.accountEntity.updateKeys(botId, body);
  }
}
