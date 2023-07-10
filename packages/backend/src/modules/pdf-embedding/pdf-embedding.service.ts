import { Injectable } from '@nestjs/common';
import {DocumentMetadataService} from "../../repositories/document-metadata/document-metadata.service";
import {UploadedFileType} from "@my-monorepo/shared/dist/uploaded-file";

@Injectable()
export class PdfEmbeddingService {
  constructor(private documentMetadataService: DocumentMetadataService){}
  saveDocumentMetadata(file: UploadedFileType) {
    return this.documentMetadataService.createDocumentMetadata({
      title: file.originalname,
      size: file.size,
      url: 'https://www.example.com'
    })
  }

  getDocumentList() {
    return this.documentMetadataService.getDocumentList()
  }
}
