import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { GithubOAuthService } from '../services/github-o-auth.service';
import {
  accountRepositoryMock,
  AUTH_PAYLOAD_MOCK,
  discordOauthServiceMock,
  githubOauthServiceMock,
  loginServiceMock,
} from 'src/mocks';
import { DiscordOAuthService } from 'src/modules/authentication/services/discord-o-auth.service';
import { AccountRepository } from 'src/repositories/account/account.repository';
import { LoginService } from 'src/modules/authentication/services/login.service';

const MOCK_ACCOUNT = {
  id: 'id',
  username: 'username',
  email: 'email',
  avatar: 'avatar',
  bio: 'bio',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: GithubOAuthService,
          useValue: githubOauthServiceMock,
        },
        {
          provide: DiscordOAuthService,
          useValue: discordOauthServiceMock,
        },
        {
          provide: AccountRepository,
          useValue: accountRepositoryMock,
        },
        {
          provide: LoginService,
          useValue: loginServiceMock,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call githubOauthService.loginWithGithub', () => {
    const code = 'code';
    controller.githubLogin({ code });
    expect(githubOauthServiceMock.loginWithGithub).toHaveBeenCalledWith(code);
  });

  it('should call discordOauthService.loginWithDiscord', () => {
    const code = 'code';
    controller.discordLogin({ code });
    expect(discordOauthServiceMock.loginWithDiscord).toHaveBeenCalledWith(code);
  });

  it('should call loginService.validate', () => {
    const access_token = 'access_token';
    controller.validate(access_token);
    expect(loginServiceMock.validate).toHaveBeenCalledWith(access_token);
  });

  it('should retrieve account info', async () => {
    const request = {
      authPayload: AUTH_PAYLOAD_MOCK,
    };
    accountRepositoryMock.getAccountById.mockResolvedValueOnce(
      MOCK_ACCOUNT as any,
    );
    const info = await controller.getAccountInfo(request);
    expect(accountRepositoryMock.getAccountById).toHaveBeenCalledWith(
      request.authPayload.uid,
    );
    expect(info).toEqual(MOCK_ACCOUNT);
  });
});
