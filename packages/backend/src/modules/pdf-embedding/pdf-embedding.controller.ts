import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChatSessionController } from '../chat-session/chat-session.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { PineconeStore } from 'langchain/vectorstores';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { ConfigService } from '@nestjs/config';
import { DOC_EMBEDDING_MODEL, ENV } from '../../constants';
import { PineconeService } from '../../services/pinecone/pinecone.service';
import { PdfUploadDto } from '../../dto/pdf-upload.dto';
import { UploadedFileType } from '@my-monorepo/shared';
import { PdfSplitterService } from '../../services/pdf-splitter/pdf-splitter.service';
import { PdfEmbeddingService } from './pdf-embedding.service';
import { DocumentNamespaceService } from '../../services/document-namespace/document-namespace.service';

@Controller('pdf-embedding')
export class PdfEmbeddingController {
  private readonly logger = new Logger(ChatSessionController.name);

  constructor(
    private configService: ConfigService,
    private pineconeService: PineconeService,
    private pdfSplitterService: PdfSplitterService,
    private pdfEmbeddingService: PdfEmbeddingService,
    private documentNamespaceService: DocumentNamespaceService,
  ) {}

  @Post('embed')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(
    @UploadedFile() file: UploadedFileType,
    @Body() splitParams: PdfUploadDto,
  ) {
    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);

    const pineconeIndex = await this.pineconeService.getIndex();

    const docs = await this.pdfSplitterService.split(file, splitParams);

    const documentMetadata =
      await this.pdfEmbeddingService.saveDocumentMetadata(file);

    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        openAIApiKey: openAiApiKey,
        modelName: DOC_EMBEDDING_MODEL,
      }),
      {
        pineconeIndex,
        namespace:
          this.documentNamespaceService.getDocumentNamespace(documentMetadata),
      },
    );

    this.logger.log(
      'used namespace for doc embedding :',
      this.documentNamespaceService.getDocumentNamespace(documentMetadata),
    );

    // TODO: confirm that the document was embedded successfully, in a database column of the DocumentMetadata table

    return {
      status: 'success',
      size: file.size,
      numberOfChunks: docs.length,
      message: 'File embedded successfully',
    };
  }

  @Get('embedded-documents')
  async getEmbeddedDocuments() {
    return this.pdfEmbeddingService.getDocumentList();
  }
}
