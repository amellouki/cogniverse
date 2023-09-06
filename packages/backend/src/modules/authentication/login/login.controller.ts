import { Body, Controller, Post } from '@nestjs/common';
import { GithubOAuthDto } from '../../../dto/github-o-auth.dto';
import { GithubOAuthService } from '../services/github-o-auth.service';
import { Public } from '../../../decorator/public';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: GithubOAuthService) {}

  @Public()
  @Post('github')
  githubLogin(@Body() oAuth: GithubOAuthDto) {
    return this.loginService.loginWithGithub(oAuth.code);
  }
}
