import { ZodValidationPipe } from './zod-validation.pipe';
import { BadRequestException } from '@nestjs/common';
import {
  ZOD_VALIDATION_MOCK_METADATA,
  ZOD_VALIDATION_MOCK_SCHEMA,
  ZOD_VALIDATION_TEST_CASES,
} from 'cogniverse-backend/mocks';

describe(`ZodValidationPipe`, () => {
  let pipe: ZodValidationPipe = null;
  beforeEach(() => {
    pipe = new ZodValidationPipe(ZOD_VALIDATION_MOCK_SCHEMA);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it.each(ZOD_VALIDATION_TEST_CASES)(
    `should validate input -> test case: $# is valid: $valid`,
    ({ valid, input }) => {
      if (valid) {
        const parsed = pipe.transform(input, ZOD_VALIDATION_MOCK_METADATA);
        expect(parsed).toEqual(input);
        return;
      }

      expect(() => pipe.transform(input, ZOD_VALIDATION_MOCK_METADATA)).toThrow(
        BadRequestException,
      );
    },
  );
});
