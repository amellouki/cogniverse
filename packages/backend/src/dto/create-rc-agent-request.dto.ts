import NewBot from '../../../shared/src/types/bot/new-bot';
import CreateLlmRequestDto from './create-llm-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateRcAgentRequestDto implements NewBot {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  retrievalLanguageModel: CreateLlmRequestDto;
  @ApiProperty()
  conversationModel: CreateLlmRequestDto;
}
