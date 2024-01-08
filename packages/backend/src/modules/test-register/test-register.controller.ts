import { Body, Controller, Post } from '@nestjs/common';
import { TestGoogleDriveRepository } from 'src/repositories/test-google-drive/test-google-drive.repository';

@Controller('test-register')
export class TestRegisterController {
  constructor(
    private readonly testGoogleDriveRepository: TestGoogleDriveRepository,
  ) {}

  @Post('google-api-app')
  async googleApp(@Body() body: { email: string }) {
    await this.testGoogleDriveRepository.registerEmail(body.email);
    return { message: 'Email registered' };
  }
}
