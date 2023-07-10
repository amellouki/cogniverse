import { Module } from '@nestjs/common';
import { DocumentMetadataService } from './document-metadata.service';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DocumentMetadataService],
  exports: [DocumentMetadataService],
})
export class DocumentMetadataModule {}
