import { Endpoints } from '@octokit/types';

export type UserResponse = Endpoints['GET /user']['response']['data'];
export type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};
