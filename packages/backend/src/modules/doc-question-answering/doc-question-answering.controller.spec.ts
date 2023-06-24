import { Test, TestingModule } from '@nestjs/testing';
import { DocQuestionAnsweringController } from './doc-question-answering.controller';

describe('QuestionAnsweringController', () => {
  let controller: DocQuestionAnsweringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocQuestionAnsweringController],
    }).compile();

    controller = module.get<DocQuestionAnsweringController>(DocQuestionAnsweringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
