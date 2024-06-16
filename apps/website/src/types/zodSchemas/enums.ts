import { z } from "zod";

export const recipe_creation_type = z
  .enum(["title", "image", "link", "upload"])
  .default("title");

export const blog_type = z
  .enum(["blog", "release", "announcement", "event"])
  .default("blog");

export const document_type = z.enum(["privacy_policy", "terms_of_service"]);

export const difficulty_level = z
  .enum(["not_set", "easy", "medium", "hard"])
  .default("not_set");

export const sweet_savoury = z
  .enum(["not_set", "sweet", "savoury", "both"])
  .default("not_set");

export const dietary = z
  .enum([
    "none",
    "vegetarian",
    "vegan",
    "pescatarian",
    "gluten_free",
    "dairy_free",
    "nut_free",
    "egg_free",
  ])
  .default("none");

export const mealTime = z
  .enum(["not_set", "breakfast", "lunch", "dinner", "snack", "dessert"])
  .default("not_set");

// auth

export const theme = z.enum(["system", "light", "dark"]).default("system");

export const fonts = z
  .enum(["default", "open_dyslexic", "monospace", "serif", "sans_serif"])
  .default("default");

export const diet = z
  .enum([
    "none",
    "vegetarian",
    "vegan",
    "pescatarian",
    "gluten_free",
    "dairy_free",
    "nut_free",
    "egg_free",
  ])
  .default("none");

export const allergens = z
  .enum([
    "none",
    "gluten",
    "dairy",
    "nuts",
    "eggs",
    "soya",
    "fish",
    "shellfish",
    "sesame",
    "celery",
    "mustard",
    "lupin",
    "molluscs",
  ])
  .default("none");

export const loveCooking = z
  .enum(["not_set", "hate_it", "dislike_it", "neutral", "like_it", "love_it"])
  .default("not_set");

export const averageTimeToCook = z
  .enum([
    "not_set",
    "less_than_15",
    "15_to_30",
    "30_to_45",
    "45_to_60",
    "60_to_90",
    "90_to_120",
    "more_than_120",
  ])
  .default("not_set");
