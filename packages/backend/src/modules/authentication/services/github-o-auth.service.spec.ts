import { GithubOAuthService } from './github-o-auth.service';
import { Test } from '@nestjs/testing';
import {
  accountRepositoryMock,
  axiosMock,
  configServiceMock,
  GITHUB_USER_RESPONSE,
  GITHUB_ACCESS_TOKEN_RESPONSE,
  jwtServiceMock,
  MOCK_ACCOUNT_DATA,
} from 'src/mocks';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { JwtService } from '@nestjs/jwt';
import { AxiosService } from 'src/services/axios/axios.service';
import { OAuthProvider } from '@prisma/client';

describe('Unit testing GithubOAuthService', () => {
  let service: GithubOAuthService;

  beforeEach(async () => {
    configServiceMock.get
      .calledWith('GITHUB_OAUTH_CLIENT_ID' as any, undefined, undefined)
      .mockReturnValueOnce('[CLIENT_ID]');
    configServiceMock.get
      .calledWith('GITHUB_OAUTH_CLIENT_SECRET' as any, undefined, undefined)
      .mockReturnValueOnce('[CLIENT_SECRET]');
    configServiceMock.get
      .calledWith('GITHUB_OAUTH_REDIRECT_URI' as any, undefined, undefined)
      .mockReturnValueOnce('[REDIRECT_URI]');

    const module = await Test.createTestingModule({
      providers: [
        GithubOAuthService,
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

    service = module.get<GithubOAuthService>(GithubOAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve github access token given code', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: GITHUB_ACCESS_TOKEN_RESPONSE,
    });
    const respone = await service.githubAccessToken('[CODE]');
    expect(axiosMock.get).toBeCalledWith(
      'https://github.com/login/oauth/access_token?client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&code=[CODE]',
      { headers: { accept: 'application/json' } },
    );
    expect(respone).toEqual(GITHUB_ACCESS_TOKEN_RESPONSE);
  });

  it('should retrieve github user given access token', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: GITHUB_USER_RESPONSE,
    });
    const user = await service.githubUser('[TOKEN]');
    expect(axiosMock.get).toBeCalledWith('https://api.github.com/user', {
      headers: {
        Authorization: 'token [TOKEN]',
      },
    });
    expect(user).toEqual(GITHUB_USER_RESPONSE);
  });

  it('should save github user', async () => {
    accountRepositoryMock.registerAccount.mockResolvedValueOnce(
      MOCK_ACCOUNT_DATA,
    );
    const savedAccount = await service.saveGithubUser(GITHUB_USER_RESPONSE);
    expect(accountRepositoryMock.registerAccount).toBeCalledWith({
      userId: GITHUB_USER_RESPONSE.id + '',
      username: GITHUB_USER_RESPONSE.login,
      profilePicture: GITHUB_USER_RESPONSE.avatar_url,
      OAuthProvider: OAuthProvider.GITHUB,
    });
    expect(savedAccount).toEqual(MOCK_ACCOUNT_DATA);
  });

  it('should login with github', async () => {
    accountRepositoryMock.getAccount.mockResolvedValueOnce(MOCK_ACCOUNT_DATA);
    jwtServiceMock.signAsync.mockResolvedValueOnce('[JWT_TOKEN]');
    axiosMock.get.mockResolvedValueOnce({
      data: GITHUB_ACCESS_TOKEN_RESPONSE,
    });
    axiosMock.get.mockResolvedValueOnce({
      data: GITHUB_USER_RESPONSE,
    });
    const jwtToken = await service.loginWithGithub('[CODE]');
    expect(accountRepositoryMock.getAccount).toBeCalledWith(
      OAuthProvider.GITHUB,
      GITHUB_USER_RESPONSE.id + '',
    );
    expect(jwtServiceMock.signAsync).toBeCalledWith({
      OAuthProvider: OAuthProvider.GITHUB,
      accessToken: GITHUB_ACCESS_TOKEN_RESPONSE.access_token,
      tokenType: GITHUB_ACCESS_TOKEN_RESPONSE.token_type,
      uid: MOCK_ACCOUNT_DATA.id,
    });
    expect(jwtToken).toEqual({
      access_token: '[JWT_TOKEN]',
    });
  });
});
