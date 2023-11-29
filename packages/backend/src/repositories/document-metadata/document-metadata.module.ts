import { Module } from '@nestjs/common';
import { DocumentMetadataEntity } from 'src/repositories/document-metadata/document-metadata.entity';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DocumentMetadataEntity],
  exports: [DocumentMetadataEntity],
})
export class DocumentMetadataModule {}
