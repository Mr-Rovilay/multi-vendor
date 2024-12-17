import * as z from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

// Password regex: At least 8 characters, one uppercase, one lowercase, one number, one special character
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(strongPasswordRegex, 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(strongPasswordRegex, 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
  role: z.enum(["customer", "vendor", "admin"]),
  contact: z.string()
  .regex(/^\d{11}$/, { message: "Phone number must be 11 Nigerian digits" })
    .optional(),
  avatar: z
    .any()
    .refine((files) => files?.length == 0 || files?.length == 1, "Image is optional.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE || !files?.[0], `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) || !files?.[0],
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .regex(/^\d{11}$/, { message: "Phone number must be 11 Nigerian digits" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional()
    .or(z.literal(''))
});

