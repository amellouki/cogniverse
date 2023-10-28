import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountModule as AccountRepoModule } from '../../repositories/account/account.module';

@Module({
  imports: [AccountRepoModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
