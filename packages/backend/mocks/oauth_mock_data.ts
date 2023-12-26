import { UserResponse as DiscordUserResponse } from 'src/types/discord-types';
import { UserResponse as GithubUserResponse } from 'src/types/github-types';
import { AccessTokenResponse as DiscordAccessTokenResponse } from 'src/types/discord-types';
import { AccessTokenResponse as GithubAccessTokenResponse } from 'src/types/github-types';

export const DISCORD_USER_RESPONSE: DiscordUserResponse = {
  id: '123456789',
  username: 'test-user',
  avatar: 'avatar.png',
};

export const GITHUB_USER_RESPONSE: GithubUserResponse = {
  bio: '',
  blog: '',
  collaborators: 0,
  company: '',
  created_at: '',
  disk_usage: 0,
  email: '',
  events_url: '',
  followers: 0,
  followers_url: '',
  following: 0,
  following_url: '',
  gists_url: '',
  gravatar_id: '',
  hireable: false,
  html_url: '',
  location: '',
  name: '',
  node_id: '',
  organizations_url: '',
  owned_private_repos: 0,
  private_gists: 0,
  public_gists: 0,
  public_repos: 0,
  received_events_url: '',
  repos_url: '',
  site_admin: false,
  starred_url: '',
  subscriptions_url: '',
  total_private_repos: 0,
  type: '',
  updated_at: '',
  url: '',
  id: 123456789,
  login: 'test-user',
  avatar_url: 'https://www.example.com/avatar.png',
};

export const DISCORD_ACCESS_TOKEN_RESPONSE: DiscordAccessTokenResponse = {
  access_token: '[ACCESS_TOKEN]',
  scope: '[SCOPE]',
  token_type: '[TOKEN_TYPE]',
};

export const GITHUB_ACCESS_TOKEN_RESPONSE: GithubAccessTokenResponse = {
  access_token: '[ACCESS_TOKEN]',
  scope: '[SCOPE]',
  token_type: '[TOKEN_TYPE]',
};
