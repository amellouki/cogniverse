import { Inject, Injectable, Scope } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { DOC_EMBEDDING_MODEL, ENV } from 'src/constants';
import { ConfigService } from '@nestjs/config';
import { PineconeService } from 'src/services/pinecone/pinecone.service';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { REQUEST } from '@nestjs/core';
import { SecureRequest } from 'src/types/secure-request';

@Injectable({
  scope: Scope.REQUEST,
})
export class StoreService {
  constructor(
    @Inject('PARENT_SPLITTER')
    private readonly splitter: RecursiveCharacterTextSplitter,
    @Inject(REQUEST) private req: SecureRequest,
    private readonly configService: ConfigService,
    private pineconeService: PineconeService,
  ) {}

  async storePDFFromBlob(blob: Blob, fileMetadata) {
    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);
    const pineconeIndex = await this.pineconeService.getIndex();
    const docs = await this.parsePDFBlob(blob, fileMetadata);
    console.log('docs', docs);
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openAiApiKey,
      modelName: DOC_EMBEDDING_MODEL,
    });
    const store = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex,
      namespace: this.req.authPayload.uid,
    });

    return {
      success: true,
    };
  }

  async parsePDFBlob(blob: Blob, metadata: any) {
    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();
    docs[0].metadata = {
      ...docs[0].metadata,
      ...metadata,
    };
    const splitDocuments = await this.splitter.splitDocuments(docs);
    return splitDocuments;
  }

  // TODO: REMOVE
  async test() {
    const openAiApiKey = this.configService.get<string>(ENV.OPEN_AI_API_KEY);
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openAiApiKey,
      modelName: DOC_EMBEDDING_MODEL,
    });
    const pineconeIndex = await this.pineconeService.getIndex();
    const store = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: this.req.authPayload.uid,
    });

    const result = await store
      .asRetriever(1)
      .getRelevantDocuments('WHAT DID WE DO IN THE SCRUM PROCESS?');

    console.log('Testing result', result);
  }
}
