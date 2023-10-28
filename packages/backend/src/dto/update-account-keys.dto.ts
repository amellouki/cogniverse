import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountKeysDto {
  @ApiProperty()
  @IsString()
  openAiApiKey: string;
}
