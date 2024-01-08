import { Test, TestingModule } from '@nestjs/testing';
import { TestRegisterController } from './test-register.controller';

describe('TestRegisterController', () => {
  let controller: TestRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestRegisterController],
    }).compile();

    controller = module.get<TestRegisterController>(TestRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
