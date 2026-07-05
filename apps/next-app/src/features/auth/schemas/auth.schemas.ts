import { z } from "zod";
import type { RegisterResponse } from "@/lib/types/auth";

export const authUserSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
  })
  .passthrough();

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    username: z.string().trim().min(2, "Username is required"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const loginResponseSchema = z.object({
  user: authUserSchema,
  message: z.string().min(1),
  token: z.string().min(1),
});

const registerResponseInputSchema = z.union([
  z.object({
    user: authUserSchema,
  }),
  authUserSchema,
]);

export const registerResponseSchema = registerResponseInputSchema.transform(
  (value): RegisterResponse => {
    const user = "user" in value ? value.user : value;

    return {
      user: user as RegisterResponse["user"],
    };
  },
);

export const forgotPasswordResponseSchema = z.object({
  message: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
