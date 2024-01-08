import { Injectable } from '@nestjs/common';
import { Account, OAuth, OAuthProvider } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AccountKeys } from '@my-monorepo/shared';

type NewAccount = Pick<
  Account,
  'userId' | 'username' | 'profilePicture' | 'OAuthProvider'
>;

@Injectable()
export class AccountRepository {
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

  async getAccountById(accountId: string) {
    return this.prismaService.account.findUnique({
      where: {
        id: accountId,
      },
    });
  }

  async updateKeys(accountId: string, data: AccountKeys) {
    return this.prismaService.account.update({
      where: {
        id: accountId,
      },
      data,
    });
  }

  async saveGoogleToken(oAuth: OAuth | Omit<OAuth, 'id'>) {
    return this.prismaService.oAuth.upsert({
      where: {
        provider_providerAccountId: {
          providerAccountId: oAuth.accountId,
          provider: OAuthProvider.GOOGLE,
        },
      },
      update: oAuth,
      create: oAuth,
    });
  }

  async saveGoogleRefreshToken(
    oAuth: Pick<OAuth, 'providerAccountId' | 'refreshToken' | 'extra'>,
  ) {
    return this.prismaService.oAuth.update({
      where: {
        provider_providerAccountId: {
          providerAccountId: oAuth.providerAccountId,
          provider: OAuthProvider.GOOGLE,
        },
      },
      data: oAuth,
    });
  }

  async findGoogleAccount(providerAccountId: string) {
    return this.prismaService.oAuth.findUnique({
      where: {
        provider_providerAccountId: {
          providerAccountId,
          provider: OAuthProvider.GOOGLE,
        },
      },
    });
  }

  async removeDeprecatedToken(providerAccountId: string) {
    return this.prismaService.oAuth.update({
      where: {
        provider_providerAccountId: {
          providerAccountId,
          provider: OAuthProvider.GOOGLE,
        },
      },
      data: {
        refreshToken: null,
        accessToken: null,
      },
    });
  }
}
