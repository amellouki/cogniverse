import { Module } from '@nestjs/common';
import { GoogleDriveController } from './google-drive/google-drive.controller';
import { GoogleClientService } from 'src/modules/data-source/google-drive/google-client/google-client.service';
import { AccountModule } from 'src/repositories/account/account.module';

@Module({
  providers: [GoogleClientService],
  controllers: [GoogleDriveController],
  imports: [AccountModule],
})
export class DataSourceModule {}
