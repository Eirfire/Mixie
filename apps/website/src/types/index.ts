import { z } from "zod";
import { amount, recipe_creation_type } from "./zodSchemas/enums";
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
import {
  blogSchema,
  blogEditSchema,
  documentSchema,
  documentEditSchema,
} from "./zodSchemas/blog-documents";

export * from "./zodSchemas";

//recipes
export type Recipe = z.infer<typeof recipeSchema>;
export type NewRecipe = z.infer<typeof recipeFormSchema>;

export type image_attributes = z.infer<typeof image_attributesSchema>;

// ingredients
export type Ingredient = z.infer<typeof ingredientSchema>;

export type Amount = z.infer<typeof amount>;

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

// blogs / documents
export type Blog = z.infer<typeof blogSchema>;
export type NewBlog = z.infer<typeof blogEditSchema>;
export type Document = z.infer<typeof documentSchema>;
export type NewDocument = z.infer<typeof documentEditSchema>;
