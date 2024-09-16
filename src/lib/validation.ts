import * as z from 'zod';

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
