import { z } from 'zod';

export const embeddingSettingsValidation = z
  .object({
    blockSize: z.coerce.number().int().min(10),
    overlap: z.coerce.number().int().min(0),
  })
  .refine((obj) => obj.blockSize > obj.overlap, {
    message: 'Block size must be greater than overlap',
  });
