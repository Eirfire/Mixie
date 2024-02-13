import { getRecipes } from "@/lib/services/data_fetching";
import { NextRequest, NextResponse } from "next/server";
import Fuse, { IFuseOptions } from "fuse.js";
import { Recipe } from "@/types";
import { isApp } from "@/lib/services/apiMiddleware";

interface SearchRecipesProps {
  query: string;
  filters?: {
    mealTime?: string | null;
    sweetSavory?: string | null;
    dietary?: string | null;
  };
  recipes: Recipe[];
}

export function searchRecipes({ query, filters, recipes }: SearchRecipesProps) {
  let searchRecipes = recipes;

  if (typeof filters?.mealTime == "string") {
    searchRecipes = searchRecipes.filter(
      (recipe) => recipe.mealTime?.value === filters.mealTime
    );
  }
  if (typeof filters?.sweetSavory == "string") {
    searchRecipes = searchRecipes.filter(
      (recipe) => recipe.sweet_savoury === filters.sweetSavory
    );
  }
  if (typeof filters?.dietary == "string") {
    searchRecipes = searchRecipes.filter(
      (recipe) => recipe.dietary === filters.dietary
    );
  }

  const options: IFuseOptions<Recipe> = {
    includeScore: true,
    keys: ["title"],
    threshold: 0.6,
  };

  const fuse = new Fuse(searchRecipes, options);
  const results = fuse.search(query);

  return results.map((result) => result.item);
}
