import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { SecureRequest } from 'src/types/secure-request';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'googleapis-common';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { OAuth } from '@prisma/client';
import { InvalidRequestException } from '@my-monorepo/shared';

@Injectable({
  scope: Scope.REQUEST,
})
export class GoogleClientService extends OAuth2Client {
  private logger: Logger = new Logger(GoogleClientService.name);
  private oAuth: OAuth;
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

  /**
   * Retrieves the OAuth object from the database and sets it to the class property
   * @throws InvalidRequestException if the OAuth object is not found
   * @private
   */
  private async retrieveAndSetOAuth() {
    if (!this.oAuth) {
      this.oAuth = await this.accountRepo.findGoogleAccount(
        this.req.authPayload.uid,
      );
    }
    if (!this.oAuth) {
      throw new InvalidRequestException('Google account not found');
    }
  }

  async retrieveAndSetAccessToken() {
    await this.retrieveAndSetOAuth();
    if (!this.oAuth.refreshToken && !this.oAuth.accessToken) {
      return false;
    }
    this.setCredentials({
      access_token: this.oAuth.accessToken,
      refresh_token: this.oAuth.refreshToken || this.oAuth.accessToken,
    });
    return true;
  }

  async removeDeprecatedToken() {
    this.oAuth = await this.accountRepo.removeDeprecatedToken(
      this.req.authPayload.uid,
    );
  }

  get oAuthData() {
    return this.oAuth;
  }
}
