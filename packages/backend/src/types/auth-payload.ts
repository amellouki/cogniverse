import { OAuthProvider } from '@prisma/client';

export type GithubAuthPayload = {
  accessToken: string;
  OAuthProvider: typeof OAuthProvider.GITHUB;
  uid: string;
};

export type AuthPayload = GithubAuthPayload; // | ... | ... | ...
