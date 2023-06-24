import { Injectable, Logger } from '@nestjs/common';
import { PdfUploadDto } from '../../dto/pdf-upload.dto';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as pdfParse from 'pdf-parse';
import { UploadedFileType } from '../../model/uploaded-file';

@Injectable()
export class PdfSplitterService {
  private readonly logger = new Logger(PdfSplitterService.name);

  async split(file: UploadedFileType, { blockSize, overlap }: PdfUploadDto) {
    const pdfData = await pdfParse(file.buffer);
    const text = pdfData.text;

    this.logger.log(
      'successfully parsed pdf of size ' + text.length + ' characters',
    );

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: Number(blockSize),
      chunkOverlap: Number(overlap),
    });

    return await splitter.createDocuments([text]);
  }
}
