import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().max(255),
  subtitle: z.string().max(500),
  content: z.string(),
  tags: z.array(z.string().max(255)),
});

export type CreateArticleData = z.infer<typeof createArticleSchema>;
