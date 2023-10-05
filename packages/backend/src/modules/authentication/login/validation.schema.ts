import { z } from 'zod';

export const discordLoginSchema = z.object({
  code: z.string(),
});

export const githubLoginSchema = z.object({
  code: z.string(),
});
