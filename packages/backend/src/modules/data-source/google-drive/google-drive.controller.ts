import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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
import { GDDataSourceRequestDto } from 'src/dto/google-drive-data-source-request.dto';
import { StoreService } from './store/store.service';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

@Controller('google')
export class GoogleDriveController {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountRepo: AccountRepository,
    private googleClient: GoogleClientService,
    private readonly storeService: StoreService,
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
      extra: {
        scope: token.tokens.scope,
        expiry_date: token.tokens.expiry_date,
      },
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
          extra: {
            scope: token.tokens.scope,
            expiry_date: token.tokens.expiry_date,
          },
        });
      }
    });
    return { valid: true };
  }

  @Get('ls/:id')
  async ls(@Param('id') id: string, @Query('pageToken') pageToken: string) {
    console.log('ls', id, pageToken);
    const accessTokenSet = await this.googleClient.retrieveAndSetAccessToken();
    if (!accessTokenSet) {
      throw new UnauthorizedException();
    }
    const drive = google.drive({ version: 'v3', auth: this.googleClient });
    const res = await drive.files.list({
      pageSize: 20,
      pageToken,
      orderBy: 'folder, name',
      fields:
        'nextPageToken, files(id, name, parents, mimeType, thumbnailLink)',
      // only pdfs
      q: `'${id}' in parents and trashed = false and mimeType = 'application/pdf'`, // TODO: SUPPORT MORE MIME TYPES
    });
    return { ...res.data };
  }

  @Get('token-status')
  async tokenStatus() {
    const accessTokenSet = await this.googleClient.retrieveAndSetAccessToken();
    if (!accessTokenSet) {
      throw new UnauthorizedException();
    }
    const extra = this.googleClient.oAuthData.extra as any;
    if (extra) {
      return {
        valid: extra.expiry_date > Date.now(),
        ...extra,
      };
    } else {
      return { valid: false };
    }
  }

  @Post('data-source')
  async dataSource(
    @Body() body: GDDataSourceRequestDto,
    @Request() request: SecureRequest,
  ) {
    console.log(JSON.stringify(body, null, 2));
    const accessTokenSet = await this.googleClient.retrieveAndSetAccessToken();
    if (!accessTokenSet) {
      throw new UnauthorizedException();
    }
    const drive = google.drive({ version: 'v3', auth: this.googleClient });
    // for each item, load the file content
    const files = await Promise.all(
      body.items.map((item) =>
        drive.files.get({ fileId: item.id, alt: 'media' }),
      ),
    );

    const success = await Promise.all(
      files.map((file) => {
        return this.storeService.storePDFFromBlob(file.data as any as Blob);
      }),
    );

    this.storeService.test();

    return success;
  }
}
