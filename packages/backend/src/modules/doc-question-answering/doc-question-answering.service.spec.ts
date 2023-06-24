import { Test, TestingModule } from '@nestjs/testing';
import { DocQuestionAnsweringService } from './doc-question-answering.service';

describe('QuestionAnsweringService', () => {
  let service: DocQuestionAnsweringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocQuestionAnsweringService],
    }).compile();

    service = module.get<DocQuestionAnsweringService>(DocQuestionAnsweringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
