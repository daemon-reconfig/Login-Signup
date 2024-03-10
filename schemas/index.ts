import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!"
  }),
  password: z.string().min(8, {message: "Password is required!"}),
});

export const SignUpSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
      }),
      password: z.string().min(8, {message: "Password is required!"}),
      name: z.string().min(3, {message: "Name is required!"}),
});