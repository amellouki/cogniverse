import { Module } from '@nestjs/common';
import { GithubOAuthService } from './github-o-auth.service';
import { RegisterService } from './register.service';
import { AccountModule } from '../../../repositories/account/account.module';

@Module({
  imports: [AccountModule],
  providers: [GithubOAuthService, RegisterService],
  exports: [GithubOAuthService, RegisterService],
})
export class ServicesModule {}
