import { Injectable } from '@nestjs/common';
import { Account, OAuthProvider } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type GithubAccount = Pick<
  Account,
  'userId' | 'username' | 'profilePicture' | 'OAuthProvider'
>;

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerGithubAccount(githubAccount: GithubAccount) {
    return this.prismaService.account.create({
      data: githubAccount,
    });
  }

  async getAccount(OAuthProvider: OAuthProvider, oAuthProviderUserId: string) {
    return this.prismaService.account.findUnique({
      where: {
        OAuthProvider_userId: {
          OAuthProvider,
          userId: oAuthProviderUserId,
        },
      },
    });
  }
}
