import {
  Account as PrismaAccount,
  OAuthProvider as PrismaOAuthProvider,
} from "@prisma/client";

export type Account = PrismaAccount;
export const OAuthProvider = PrismaOAuthProvider;

type NewGithubAccount = Pick<
  Account,
  "userId" | "username" | "profilePicture" | "OAuthProvider"
> & { OAuthProvider: typeof OAuthProvider.GITHUB };

export type AccountKeys = Partial<Pick<Account, "openAiApiKey" | "id">>;
