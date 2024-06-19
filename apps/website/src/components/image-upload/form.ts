import { z } from "zod";
import { ImageAttributes, image_attributesSchema } from "@/types";

export type ImageUploadType = "url" | "upload" | "search";

export const imageUploadSchema = z.object({
  image_url: z.string().url(),
  image_attributes: image_attributesSchema,
});

export type ImagedUploadSchema = z.ZodType<z.input<typeof imageUploadSchema>>;
