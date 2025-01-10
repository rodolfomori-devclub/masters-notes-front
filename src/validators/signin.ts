import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export type SignInData = z.infer<typeof signInSchema>;
