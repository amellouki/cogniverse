import { IsNotEmpty } from 'class-validator';
import { NewConversation } from '@my-monorepo/shared';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateConversationRequestDto implements NewConversation {
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  botId: number;

  @IsNotEmpty()
  documentId: number;
}
