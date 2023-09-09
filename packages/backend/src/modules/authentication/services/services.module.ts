import { Module } from '@nestjs/common';
import { GithubOAuthService } from './github-o-auth.service';
import { RegisterService } from './register.service';
import { AccountModule } from '../../../repositories/account/account.module';
import { LoginService } from './login.service';
import { DiscordOAuthService } from './discord-o-auth.service';

@Module({
  imports: [AccountModule],
  providers: [
    GithubOAuthService,
    DiscordOAuthService,
    RegisterService,
    LoginService,
  ],
  exports: [
    GithubOAuthService,
    DiscordOAuthService,
    RegisterService,
    LoginService,
  ],
})
export class ServicesModule {}
