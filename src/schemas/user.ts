import { z } from "zod";

export const signUpInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;

export const signInInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInInputSchema>;
