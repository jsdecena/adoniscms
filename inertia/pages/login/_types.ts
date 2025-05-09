import { z } from 'zod';

export const PayloadSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password is required'),
});

export type TPayload = z.infer<typeof PayloadSchema>;
