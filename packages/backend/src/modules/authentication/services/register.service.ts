import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OAuthProvider } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { GithubOAuthService } from './github-o-auth.service';
import { UserResponse } from '../../../types/github-types';

@Injectable()
export class RegisterService {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountRepository: AccountRepository,
    private readonly loginService: GithubOAuthService,
  ) {}

  async registerGithubUser(code: string) {
    const login = await this.loginService.loginWithGithub(code);
    const response = await axios<UserResponse>({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: 'token ' + login.access_token,
      },
    });
    return this.saveGithubUser(response.data);
  }

  async saveGithubUser(githubUser: UserResponse) {
    return this.accountRepository.registerAccount({
      userId: githubUser.id + '',
      username: githubUser.name,
      profilePicture: githubUser.avatar_url,
      OAuthProvider: OAuthProvider.GITHUB,
    });
  }
}
