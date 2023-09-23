import { ApiProperty } from '@nestjs/swagger';

export class DiscordOAuthDto {
  @ApiProperty()
  code: string;
}
