import { Tables } from "database.types";
import { z } from "zod";
import { profileEditSchema } from "./zodSchemas";
import {
  blogEditSchema,
  documentEditSchema
} from "./zodSchemas/blog-documents";
import { recipe_creation_type } from "./zodSchemas/enums";
import {
  bookmarksWithLinkSchema,
  collectionSchema,
  image_attributesSchema,
  ingredientSchema,
  ratingsSchema,
  recipeFormSchema,
  recipeSchema,
  stepSchema,
} from "./zodSchemas/recipes";

export * from "./zodSchemas";

//recipes
export type Recipe = z.infer<typeof recipeSchema>;
export type NewRecipe = z.infer<typeof recipeFormSchema>;

export type image_attributes = z.infer<typeof image_attributesSchema>;

// ingredients
export type Ingredient = z.infer<typeof ingredientSchema>;

export type Step = z.infer<typeof stepSchema>;

export type SelectValue = {
  label: string;
  value: string;
};

export type Rating = z.infer<typeof ratingsSchema>;

// bookmarks
export type Bookmark = z.infer<typeof bookmarksWithLinkSchema>;
export type Collection = z.infer<typeof collectionSchema>;

export type RecipeCreationType = z.infer<typeof recipe_creation_type>;

// users
export type Profile = Tables<"profiles">;
export type NewProfile = z.infer<typeof profileEditSchema>;

// blogs / documents
export type Blog = Tables<"blog">;
export type NewBlog = z.infer<typeof blogEditSchema>;
export type Document = Tables<"documents">;
export type NewDocument = z.infer<typeof documentEditSchema>;
