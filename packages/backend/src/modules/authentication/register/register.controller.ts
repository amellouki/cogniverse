import { Body, Controller, Post } from '@nestjs/common';
import { GithubOAuthDto } from '../../../dto/github-o-auth.dto';
import { GithubOAuthService } from '../services/github-o-auth.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly githubOAuthService: GithubOAuthService) {}

  // @Post('github')
  // githubLogin(@Body() oAuth: GithubOAuthDto) {
  //   return this.githubOAuthService.registerWithGithub(oAuth.code);
  // }
}
