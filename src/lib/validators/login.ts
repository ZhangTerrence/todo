import { z } from "zod";

export const Login = z.object({
  email: z
    .string({
      message: "Email is required.",
    })
    .trim()
    .email({
      message: "Invalid email.",
    }),
  password: z
    .string({
      message: "Password is required.",
    })
    .trim()
    .min(8, {
      message: "Password must have at least 8 characters.",
    })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-._@+!]).*/, {
      message: "Password must have at least 1 number, 1 lowercase letter, 1 uppercase letter and 1 special character.",
    }),
});

export type LoginType = z.infer<typeof Login>;
