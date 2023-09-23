import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuthProvider } from '@prisma/client';
import { AccountService } from '../../../repositories/account/account.service';
import { DiscordAuthPayload } from '../../../types/auth-payload';
import {
  AccessTokenResponse,
  UserResponse,
} from '../../../types/discord-types';

@Injectable()
export class DiscordOAuthService {
  private readonly clientID = this.configService.get('DISCORD_OAUTH_CLIENT_ID');
  private readonly clientSecret = this.configService.get(
    'DISCORD_OAUTH_CLIENT_SECRET',
  );
  private readonly redirectUri = this.configService.get(
    'DISCORD_OAUTH_REDIRECT_URI',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}

  async discordAccessToken(code: string): Promise<AccessTokenResponse> {
    const params = new URLSearchParams();
    params.append('client_id', this.clientID);
    params.append('client_secret', this.clientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.redirectUri);

    const response = await axios.post(
      'https://discord.com/api/oauth2/token',
      params,
    );

    return response.data;
  }

  async discordUser(
    tokenType: string,
    accessToken: string,
  ): Promise<UserResponse> {
    const response = await axios<UserResponse>({
      method: 'get',
      url: `https://discord.com/api/users/@me`,
      headers: {
        Authorization: tokenType + ' ' + accessToken,
      },
    });

    return response.data;
  }

  async saveDiscordUser(githubUser: UserResponse) {
    return this.accountService.registerAccount({
      userId: githubUser.id + '',
      username: githubUser.username,
      profilePicture: githubUser.avatar,
      OAuthProvider: OAuthProvider.DISCORD,
    });
  }

  async loginWithDiscord(code: string) {
    const accessTokenResponse = await this.discordAccessToken(code);
    const userResponse = await this.discordUser(
      accessTokenResponse.token_type,
      accessTokenResponse.access_token,
    );
    let account = await this.accountService.getAccount(
      OAuthProvider.DISCORD,
      userResponse.id + '',
    );
    if (!account) {
      account = await this.saveDiscordUser(userResponse);
    }
    const payload: DiscordAuthPayload = {
      OAuthProvider: OAuthProvider.DISCORD,
      accessToken: accessTokenResponse.access_token,
      tokenType: accessTokenResponse.token_type,
      uid: account.id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }

  async registerWithDiscord(code: string) {
    const accessTokenResponse = await this.discordAccessToken(code);
    const userResponse = await this.discordUser(
      accessTokenResponse.token_type,
      accessTokenResponse.access_token,
    );
    const account = await this.saveDiscordUser(userResponse);
    const payload = {
      OAuthProvider: OAuthProvider.DISCORD,
      accessToken: accessTokenResponse.access_token,
      uId: account.id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
