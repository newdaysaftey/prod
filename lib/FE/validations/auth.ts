import * as z from "zod";

export const signUpSchema = z.object({
  Email: z.string().email("Invalid email address"),
  Username: z.string().min(3, "Username must be at least 3 characters"),
  Password: z.string().min(8, "Password must be at least 8 characters"),
  FirstName: z.string().min(2, "First name must be at least 2 characters"),
  LastName: z.string().min(2, "Last name must be at least 2 characters"),
});

export const signInSchema = z.object({
  Email: z.string().email("Invalid email address"),
  Password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
