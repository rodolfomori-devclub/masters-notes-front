import { z } from 'zod';

export const registerUserSchema = z
  .object({
    fullName: z.string().max(255).nonempty(),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().nonempty(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Must be equal to Password ',
    path: ['confirmPassword'],
  });

export type RegisterUserData = z.infer<typeof registerUserSchema>;
