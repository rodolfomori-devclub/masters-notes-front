import { z } from 'zod';

export const updateArticleSchema = z.object({
  title: z.string().max(255).optional(),
  subtitle: z.string().max(500).optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateArticleData = z.infer<typeof updateArticleSchema>;
