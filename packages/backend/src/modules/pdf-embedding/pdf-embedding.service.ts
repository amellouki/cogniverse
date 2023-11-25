import { Injectable } from '@nestjs/common';
import { DocumentMetadataEntity } from 'src/repositories/document-metadata/document-metadata.entity';
import { UploadedFileType } from '@my-monorepo/shared';
import { DocumentMetadata } from '@prisma/client';

@Injectable()
export class PdfEmbeddingService {
  constructor(private documentMetadataEntity: DocumentMetadataEntity) {}
  saveDocumentMetadata(
    file: UploadedFileType,
    ownerId: string,
  ): Promise<DocumentMetadata> {
    return this.documentMetadataEntity.createDocumentMetadata({
      title: file.originalname,
      size: file.size,
      url: 'https://www.example.com',
      embeddingStatus: 'pending',
      owner: {
        connect: {
          id: ownerId,
        },
      },
    });
  }

  getDocumentListByOwnerId(ownerId: string) {
    return this.documentMetadataEntity.getDocumentListByOwnerId(ownerId);
  }
}
