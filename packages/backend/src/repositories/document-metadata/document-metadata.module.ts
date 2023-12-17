import { Module } from '@nestjs/common';
import { DocumentMetadataRepository } from 'src/repositories/document-metadata/document-metadata.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DocumentMetadataRepository],
  exports: [DocumentMetadataRepository],
})
export class DocumentMetadataModule {}
