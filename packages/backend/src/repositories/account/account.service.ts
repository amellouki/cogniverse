import { Injectable } from '@nestjs/common';
import { Account, OAuthProvider } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type NewAccount = Pick<
  Account,
  'userId' | 'username' | 'profilePicture' | 'OAuthProvider'
>;

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async registerAccount(newAccount: NewAccount) {
    return this.prismaService.account.create({
      data: newAccount,
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
