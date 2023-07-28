import NewRCAgent from '@my-monorepo/shared/dist/new-rc-agent';
import CreateLlmRequestDto from './create-llm-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateRcAgentRequestDto implements NewRCAgent {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  retrievalLanguageModel: CreateLlmRequestDto;
  @ApiProperty()
  conversationModel: CreateLlmRequestDto;
}
