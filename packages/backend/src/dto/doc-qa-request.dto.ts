import { ApiProperty } from '@nestjs/swagger';

export class DocQaRequestDto {
  @ApiProperty({ type: 'string' })
  query: string;
}
