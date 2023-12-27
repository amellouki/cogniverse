import { AuthPayload } from 'src/types/auth-payload';

export const AUTH_PAYLOAD_MOCK: AuthPayload = {
  tokenType: 'Bearer',
  OAuthProvider: 'DISCORD',
  accessToken: 'discord-access-token',
  uid: 'user-id',
};
