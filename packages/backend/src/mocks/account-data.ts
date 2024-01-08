import { Account, OAuthProvider } from '@my-monorepo/shared';

export const MOCK_ACCOUNT_DATA: Account = {
  OAuthProvider: OAuthProvider.GITHUB,
  id: '1234',
  openAiApiKey: null,
  profilePicture: 'https://www.example.com/avatar.png',
  userId: '123456789',
  username: 'USER_NAME',
};
