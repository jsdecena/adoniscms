import { z } from 'zod';

export const PayloadSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export type TPayload = z.infer<typeof PayloadSchema>;
