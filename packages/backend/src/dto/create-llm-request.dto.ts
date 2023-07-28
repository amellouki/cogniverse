import NewLlm from '@my-monorepo/shared/dist/new-llm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateLlmRequestDto implements NewLlm {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  prompt: string;
  @ApiProperty()
  @IsString()
  type: string;
}
