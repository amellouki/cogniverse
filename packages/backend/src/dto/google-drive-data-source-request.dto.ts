import { ApiProperty } from '@nestjs/swagger';
import {
  GDDataSourceRequestDto as DataSourceRequestDto,
  GDDataSourceItemDto as DataSourceItemDto,
} from '@my-monorepo/shared';

export class GDDataSourceRequestDto extends DataSourceRequestDto {
  @ApiProperty()
  items: DataSourceItemDto[];
}

export class GDDataSourceItemDto extends DataSourceItemDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  mimeType: string;
}
