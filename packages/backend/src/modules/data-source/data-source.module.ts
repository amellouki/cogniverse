import { Module } from '@nestjs/common';
import { GoogleDriveController } from './google-drive/google-drive.controller';
import { AccountModule } from 'src/repositories/account/account.module';
import { StoreService } from './google-drive/store/store.service';
import { GoogleClientService } from './google-drive/google-client/google-client.service';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeService } from 'src/services/pinecone/pinecone.service';

@Module({
  providers: [
    GoogleClientService,
    StoreService,
    PineconeService,
    {
      provide: 'PARENT_SPLITTER',
      useValue: new RecursiveCharacterTextSplitter({
        chunkOverlap: 0,
        chunkSize: 1000,
      }),
    },
    {
      provide: 'CHILD_SPLITTER',
      useValue: new RecursiveCharacterTextSplitter({
        chunkOverlap: 0,
        chunkSize: 50,
      }),
    },
  ],
  controllers: [GoogleDriveController],
  imports: [AccountModule],
})
export class DataSourceModule {}
