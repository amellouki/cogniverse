import { IsNotEmpty } from 'class-validator';
import NewConversation from '@my-monorepo/shared/dist/new-conversation';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateConversationRequestDto implements NewConversation {
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  agentId: number;

  @IsNotEmpty()
  documentId: number;
}
