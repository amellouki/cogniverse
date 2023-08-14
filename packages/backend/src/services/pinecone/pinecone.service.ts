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
      const client = new PineconeClient();
      await client.init({
        apiKey: this.configService.get<string>(ENV.PINECONE_API_KEY),
        environment: this.configService.get<string>(ENV.PINECONE_ENVIRONMENT),
      });
      this.client = client; // only assign if init is successful to avoid race conditions
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
