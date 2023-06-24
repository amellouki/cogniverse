import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PdfUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  @ApiProperty()
  @IsNumberString()
  blockSize: number;

  @ApiProperty()
  @IsNumberString()
  overlap: number;
}
