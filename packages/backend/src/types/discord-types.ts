export type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

export type UserResponse = {
  id: string;
  username: string;
  avatar: string | null;
};
