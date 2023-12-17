import { Injectable } from '@nestjs/common';
import { DocumentMetadataRepository } from 'src/repositories/document-metadata/document-metadata.repository';
import { UploadedFileType } from '@my-monorepo/shared';
import { DocumentMetadata } from '@prisma/client';

@Injectable()
export class PdfEmbeddingService {
  constructor(private documentMetadataRepository: DocumentMetadataRepository) {}
  saveDocumentMetadata(
    file: UploadedFileType,
    ownerId: string,
  ): Promise<DocumentMetadata> {
    return this.documentMetadataRepository.createDocumentMetadata({
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
    return this.documentMetadataRepository.getDocumentListByOwnerId(ownerId);
  }
}
