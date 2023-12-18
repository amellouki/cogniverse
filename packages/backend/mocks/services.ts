import { mockDeep } from 'jest-mock-extended';
import { GithubOAuthService } from 'cogniverse-backend/src/modules/authentication/services/github-o-auth.service';
import { DiscordOAuthService } from 'cogniverse-backend/src/modules/authentication/services/discord-o-auth.service';
import { LoginService } from 'cogniverse-backend/src/modules/authentication/services/login.service';

export const githubOauthServiceMock = mockDeep<GithubOAuthService>();
export const discordOauthServiceMock = mockDeep<DiscordOAuthService>();
export const loginServiceMock = mockDeep<LoginService>();
