import * as z from "zod";
export * from "./recipes";
export * from "./enums";
export * from "./blog-documents";
export * from "./feedback";
export * from "./profiles";

export const bookmarkRouteSchema = z.object({
  collections: z.string().array().nullish(),
  notes: z.string().nullish(),
  rating: z.number().nullish(),
  tags: z.string().array().nullish(),
});
