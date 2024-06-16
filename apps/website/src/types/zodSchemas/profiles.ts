import * as z from "zod";
import { user_role } from "./enums";

export const profileSchema = z.object({
  profile_id: z.string(),
  full_name: z.string().nullable(),
  user_name: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  profile_picture: z.string().nullable(),
  bio: z.string().nullable(),
  user_role: user_role.default("user"),
  created_at: z.string(),
  updated_at: z.string(),
});

export const profileEditSchema = z.object({
  profile_id: z.string().optional(),
  full_name: z.string().nullish(),
  user_name: z.string().nullish(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  email: z.string().nullish(),
  profile_picture: z.string().nullish(),
  bio: z.string().nullish(),
  user_role: user_role.default("user").optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
