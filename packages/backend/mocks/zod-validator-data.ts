import { z } from 'zod';
import { ArgumentMetadata } from '@nestjs/common';

export const ZOD_VALIDATION_MOCK_SCHEMA = z.object({
  name: z.string().nonempty(),
  description: z.string().nullable(),
});

const VALID_INPUT_1 = {
  name: 'TestBot1',
  description: 'test bot 1',
};

const VALID_INPUT_2 = {
  name: 'TestBot2',
  description: null,
};

const INVALID_INPUT_1 = {
  key: 'value',
};

export const ZOD_VALIDATION_MOCK_METADATA: ArgumentMetadata = {
  type: 'body',
};

export const ZOD_VALIDATION_TEST_CASES = [
  {
    description: 'available name and description',
    input: VALID_INPUT_1,
    valid: true,
  },
  {
    description: 'available name and no description',
    input: VALID_INPUT_2,
    valid: true,
  },
  {
    description: 'invalid input',
    input: INVALID_INPUT_1,
    valid: false,
  },
];
