import { Module } from '@nestjs/common';
import { TestGoogleDriveRepository } from 'src/repositories/test-google-drive/test-google-drive.repository';
import { PrismaModule } from 'src/repositories/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TestGoogleDriveRepository],
  exports: [TestGoogleDriveRepository],
})
export class TestGoogleDriveModule {}
