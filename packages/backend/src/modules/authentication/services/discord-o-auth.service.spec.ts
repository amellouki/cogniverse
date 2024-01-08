import { DiscordOAuthService } from './discord-o-auth.service';
import { Test } from '@nestjs/testing';
import {
  accountRepositoryMock,
  axiosMock,
  configServiceMock,
  DISCORD_USER_RESPONSE,
  DISCORD_ACCESS_TOKEN_RESPONSE,
  jwtServiceMock,
  MOCK_ACCOUNT_DATA,
} from 'cogniverse-backend/mocks';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { JwtService } from '@nestjs/jwt';
import { AxiosService } from 'src/services/axios/axios.service';
import { OAuthProvider } from '@prisma/client';

describe('Unit testing DiscordOAuthService', () => {
  let service: DiscordOAuthService;

  beforeEach(async () => {
    configServiceMock.get
      .calledWith('DISCORD_OAUTH_CLIENT_ID' as any, undefined, undefined)
      .mockReturnValueOnce('[CLIENT_ID]');
    configServiceMock.get
      .calledWith('DISCORD_OAUTH_CLIENT_SECRET' as any, undefined, undefined)
      .mockReturnValueOnce('[CLIENT_SECRET]');
    configServiceMock.get
      .calledWith('DISCORD_OAUTH_REDIRECT_URI' as any, undefined, undefined)
      .mockReturnValueOnce('[REDIRECT_URI]');

    const module = await Test.createTestingModule({
      providers: [
        DiscordOAuthService,
        {
          provide: AxiosService,
          useValue: axiosMock,
        },
        {
          provide: AccountRepository,
          useValue: accountRepositoryMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    service = module.get<DiscordOAuthService>(DiscordOAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve discord access token given code', async () => {
    axiosMock.post.mockResolvedValueOnce({
      data: DISCORD_ACCESS_TOKEN_RESPONSE,
    });
    const respone = await service.discordAccessToken('[CODE]');
    expect(axiosMock.post).toBeCalledWith(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: '[CLIENT_ID]',
        client_secret: '[CLIENT_SECRET]',
        grant_type: 'authorization_code',
        code: '[CODE]',
        redirect_uri: '[REDIRECT_URI]',
      }),
    );
    expect(respone).toEqual(DISCORD_ACCESS_TOKEN_RESPONSE);
  });

  it('should retrieve discord user given access token', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: DISCORD_USER_RESPONSE,
    });
    const user = await service.discordUser('[TYPE]', '[TOKEN]');
    expect(axiosMock.get).toBeCalledWith('https://discord.com/api/users/@me', {
      headers: {
        Authorization: '[TYPE] [TOKEN]',
      },
    });
    expect(user).toEqual(DISCORD_USER_RESPONSE);
  });

  it('should save discord user', async () => {
    accountRepositoryMock.registerAccount.mockResolvedValueOnce(
      MOCK_ACCOUNT_DATA,
    );
    const savedAccount = await service.saveDiscordUser(DISCORD_USER_RESPONSE);
    expect(accountRepositoryMock.registerAccount).toBeCalledWith({
      userId: DISCORD_USER_RESPONSE.id + '',
      username: DISCORD_USER_RESPONSE.username,
      profilePicture: DISCORD_USER_RESPONSE.avatar,
      OAuthProvider: OAuthProvider.DISCORD,
    });
    expect(savedAccount).toEqual(MOCK_ACCOUNT_DATA);
  });

  it('should login with discord', async () => {
    accountRepositoryMock.getAccount.mockResolvedValueOnce(MOCK_ACCOUNT_DATA);
    jwtServiceMock.signAsync.mockResolvedValueOnce('[JWT_TOKEN]');
    axiosMock.post.mockResolvedValueOnce({
      data: DISCORD_ACCESS_TOKEN_RESPONSE,
    });
    axiosMock.get.mockResolvedValueOnce({
      data: DISCORD_USER_RESPONSE,
    });
    const jwtToken = await service.loginWithDiscord('[CODE]');
    expect(accountRepositoryMock.getAccount).toBeCalledWith(
      OAuthProvider.DISCORD,
      DISCORD_USER_RESPONSE.id + '',
    );
    expect(jwtServiceMock.signAsync).toBeCalledWith({
      OAuthProvider: OAuthProvider.DISCORD,
      accessToken: DISCORD_ACCESS_TOKEN_RESPONSE.access_token,
      tokenType: DISCORD_ACCESS_TOKEN_RESPONSE.token_type,
      uid: MOCK_ACCOUNT_DATA.id,
    });
    expect(jwtToken).toEqual({
      access_token: '[JWT_TOKEN]',
    });
  });
});
