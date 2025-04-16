import { z } from "zod";
import { validations } from "./form-validation";

/**
 * Common form schemas that can be reused across the application
 */

// Login form schema
export const loginSchema = z.object({
  email: validations.email,
  password: validations.password,
  rememberMe: z.boolean().optional(),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

// Registration form schema
export const registrationSchema = z.object({
  name: validations.name,
  email: validations.email,
  password: validations.password,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
export type RegistrationFormValues = z.infer<typeof registrationSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: validations.name,
  email: validations.email,
  subject: validations.required("Subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Profile update schema
export const profileUpdateSchema = z.object({
  name: validations.name,
  email: validations.email,
  phone: validations.phone.optional().nullable(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});
export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;

// Password change schema
export const passwordChangeSchema = z.object({
  currentPassword: validations.password,
  newPassword: validations.password,
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"],
}).refine(data => data.currentPassword !== data.newPassword, {
  message: "New password must be different from current password",
  path: ["newPassword"],
});
export type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;