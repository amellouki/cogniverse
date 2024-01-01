import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Public } from 'src/decorator/public';
import { SecureRequest } from 'src/types/secure-request';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { OAuthProvider } from '@my-monorepo/shared';
import { GoogleClientService } from './google-client/google-client.service';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

@Controller('google')
export class GoogleDriveController {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountRepo: AccountRepository,
    private googleClient: GoogleClientService,
  ) {}

  @Public()
  @Get('auth_url')
  async authUrl() {
    return {
      url: this.googleClient.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      }),
    };
  }

  @Post('consent')
  async consent(@Body('code') code: string, @Request() req: SecureRequest) {
    const token = await this.googleClient.getToken(code);
    this.googleClient.setCredentials(token.tokens);
    await this.accountRepo.saveGoogleToken({
      extra: undefined,
      providerAccountId: req.authPayload.uid,
      accessToken: token.tokens.access_token,
      refreshToken: undefined,
      accountId: req.authPayload.uid,
      provider: OAuthProvider.GOOGLE,
    });
    this.googleClient.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in your secure persistent database
        this.accountRepo.saveGoogleRefreshToken({
          providerAccountId: req.authPayload.uid,
          refreshToken: tokens.refresh_token,
        });
      }
    });
    return { invalid: false };
  }

  @Get('ls/:id')
  async ls(@Param('id') id: string) {
    const accessTokenSet = await this.googleClient.retrieveAndSetAccessToken();
    if (!accessTokenSet) {
      throw new UnauthorizedException();
    }
    const drive = google.drive({ version: 'v3', auth: this.googleClient });
    const res = await drive.files.list({
      pageSize: 20,
      fields: 'nextPageToken, files(id, name, parents)',
      q: `'${id}' in parents and trashed = false`,
    });
    return res.data.files;
  }

  @Get('connected')
  async connected() {
    return this.googleClient.validateAccessToken();
  }
}
