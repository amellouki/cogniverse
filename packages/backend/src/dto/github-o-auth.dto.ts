import { ApiProperty } from '@nestjs/swagger';

export class GithubOAuthDto {
  @ApiProperty()
  code: string;
}
