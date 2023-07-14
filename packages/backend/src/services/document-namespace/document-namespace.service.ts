import { Injectable } from '@nestjs/common';
import { DocumentMetadata } from '@prisma/client';

@Injectable()
export class DocumentNamespaceService {
  getDocumentNamespace(document: DocumentMetadata) {
    return (
      document.id.toString() + '_' + document.embeddedAt.getTime().toString()
    );
  }
}
