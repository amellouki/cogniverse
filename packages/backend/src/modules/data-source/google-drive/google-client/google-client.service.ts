import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { SecureRequest } from 'src/types/secure-request';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'googleapis-common';
import { AccountRepository } from 'src/repositories/account/account.repository';

@Injectable({
  scope: Scope.REQUEST,
})
export class GoogleClientService extends OAuth2Client {
  createdAt: Date = new Date();
  constructor(
    @Inject(REQUEST) private req: SecureRequest,
    private readonly configService: ConfigService,
    private readonly accountRepo: AccountRepository,
  ) {
    const GOOGLE_CLIENT_ID = configService.get<string>(
      'GOOGLE_OAUTH2_CLIENT_ID',
    );
    const GOOGLE_SECRET = configService.get<string>('GOOGLE_OAUTH2_SECRET');
    const GOOGLE_REDIRECT_URI = configService.get<string>(
      'GOOGLE_OAUTH2_REDIRECT_URI',
    );
    super(GOOGLE_CLIENT_ID, GOOGLE_SECRET, GOOGLE_REDIRECT_URI);
  }

  async retrieveAndSetAccessToken() {
    const oAuth = await this.accountRepo.findGoogleAccount(
      this.req.authPayload.uid,
    );
    if (!oAuth) {
      return false;
    }
    this.setCredentials({
      refresh_token: oAuth.refreshToken || oAuth.accessToken,
    });
    return true;
  }

  async validateAccessToken() {
    const account = await this.accountRepo.findGoogleAccount(
      this.req.authPayload.uid,
    );
    // validate token
    try {
      if (account) {
        this.setCredentials({
          refresh_token: account.refreshToken,
        });
        await this.verifyIdToken({
          idToken: account.refreshToken,
          audience: this.configService.get<string>('GOOGLE_OAUTH2_CLIENT_ID'),
        });
      }
    } catch (e) {
      return { connected: false };
    }
    return { connected: !!account };
  }
}
