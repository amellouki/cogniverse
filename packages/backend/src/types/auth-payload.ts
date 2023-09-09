import { OAuthProvider } from '@prisma/client';

export type GithubAuthPayload = {
  accessToken: string;
  tokenType: string;
  OAuthProvider: typeof OAuthProvider.GITHUB;
  uid: string;
};

export type DiscordAuthPayload = {
  accessToken: string;
  tokenType: string;
  OAuthProvider: typeof OAuthProvider.DISCORD;
  uid: string;
};

export type AuthPayload = GithubAuthPayload | DiscordAuthPayload;
