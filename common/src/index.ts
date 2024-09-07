import { z } from "zod";

export const blogDataPOST = z.object({
  title: z.string().min(4, "Title is required/too short"),
  content: z.string().min(10, "Content is required/too short"),
});
export type BlogDataPOST = z.infer<typeof blogDataPOST>;

export const blogDataPUT = z.object({
  id: z.string().uuid("ID field is required"),
  title: z.string().optional(),
  content: z.string().optional(),
});
export type BlogDataPUT = z.infer<typeof blogDataPUT>;

export const signUpParams = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password is required"),
  name: z.string().optional(),
});
export type SignUpParams = z.infer<typeof signUpParams>;

export const signInParams = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password is required"),
});
export type SignInParams = z.infer<typeof signInParams>;
