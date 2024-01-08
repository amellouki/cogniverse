import { Module } from '@nestjs/common';
import { TestRegisterController } from './test-register.controller';
import { TestGoogleDriveModule } from 'src/repositories/test-google-drive/test-google-drive.module';

@Module({
  imports: [TestGoogleDriveModule],
  controllers: [TestRegisterController],
})
export class TestRegisterModule {}
