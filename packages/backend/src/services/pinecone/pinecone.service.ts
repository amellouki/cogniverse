import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PineconeClient } from '@pinecone-database/pinecone';
import { ENV } from '../../constants';
import { VectorOperationsApi } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

@Injectable()
export class PineconeService {
  private client: PineconeClient = null;
  private index: VectorOperationsApi = null;

  constructor(private configService: ConfigService) {}

  async getClient() {
    if (this.client === null) {
      this.client = new PineconeClient();
      await this.client.init({
        apiKey: this.configService.get<string>(ENV.PINECONE_API_KEY),
        environment: this.configService.get<string>(ENV.PINECONE_ENVIRONMENT),
      });
    }
    return this.client;
  }

  async getIndex() {
    if (this.index === null) {
      const client = await this.getClient();
      this.index = client.Index(
        this.configService.get<string>(ENV.PINECONE_INDEX),
      );
    }
    return this.index;
  }
}
