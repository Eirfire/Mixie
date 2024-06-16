import * as z from "zod";
import { document_type, blog_type } from "./enums";

export const blogSchema = z.object({
  blog_id: z.string(),
  title: z.string(),
  image_url: z.string(),
  image_alt: z.string(),
  content: z.string(),
  tags: z.string().array().nullable(),
  blog_type: blog_type,
  author_id: z.string(),
  published: z.boolean().default(false),
  created_at: z.string(),
  updated_at: z.string(),
});

export const blogEditSchema = z.object({
  blog_id: z.string().optional(),
  title: z.string(),
  image_url: z.string(),
  image_alt: z.string(),
  content: z.string(),
  tags: z.string().array().nullish(),
  blog_type: blog_type,
  author_id: z.string(),
  published: z.boolean().default(false).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const documentSchema = z.object({
  document_id: z.string(),
  title: z.string(),
  content: z.string(),
  document_type: document_type,
  created_at: z.string(),
  updated_at: z.string(),
});

export const documentEditSchema = z.object({
  document_id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  document_type: document_type,
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
