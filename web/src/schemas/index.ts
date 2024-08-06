import * as z from 'zod'

export const SigninSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(2, { message: "Password can't be empty" }),
})

export const SignupSchema = z
  .object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(2, { message: "Password can't be empty" }),
    confirmPassword: z.string().min(2, { message: "Password can't be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Path of error message
  })
