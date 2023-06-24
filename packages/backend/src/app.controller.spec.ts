import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // write test code for getCompletion, and mock the dependencies
  describe('getCompletion', () => {
    it('should respond with an observable"', () => {
      // arrange
      const query = 'What is the meaning of life?';
      // act
      const result = appController.getCompletion(query);
      // assert
      expect(result).toBeTruthy();
    });
  });
});
