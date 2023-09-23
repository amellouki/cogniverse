import { Module } from '@nestjs/common';
import { DocumentNamespaceService } from './document-namespace.service';

@Module({
  providers: [DocumentNamespaceService],
  exports: [DocumentNamespaceService],
})
export class DocumentNamespaceModule {}
