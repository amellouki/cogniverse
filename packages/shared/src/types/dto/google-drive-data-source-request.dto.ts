import { ApiProperty } from "@nestjs/swagger";

export class GDDataSourceRequestDto {
  items: GDDataSourceItemDto[];
}

export class GDDataSourceItemDto {
  id: string;
  mimeType: string;
}
