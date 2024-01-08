import { Test, TestingModule } from '@nestjs/testing';
import { TestGoogleDriveRepository } from 'src/repositories/test-google-drive/test-google-drive.repository';

describe('TestGoogleDriveService', () => {
  let service: TestGoogleDriveRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestGoogleDriveRepository],
    }).compile();

    service = module.get<TestGoogleDriveRepository>(TestGoogleDriveRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
