import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from '../../constants';
import { Pinecone, Index as PineconeIndex } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService {
  private client: Pinecone = null;
  private index: PineconeIndex = null;

  constructor(private configService: ConfigService) {}

  getClient() {
    if (this.client === null) {
      const client = new Pinecone({
        apiKey: this.configService.get<string>(ENV.PINECONE_API_KEY),
        environment: this.configService.get<string>(ENV.PINECONE_ENVIRONMENT),
      });
      this.client = client; // only assign if init is successful to avoid race conditions
    }
    return this.client;
  }

  async getIndex() {
    if (this.index === null) {
      const client = this.getClient();
      this.index = client.Index(
        this.configService.get<string>(ENV.PINECONE_INDEX),
      );
    }
    return this.index;
  }
}
