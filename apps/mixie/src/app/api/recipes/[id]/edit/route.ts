import { recipeId } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db/index";
import { recipes } from "@/server/db/schemas";
import { NewRecipe } from "@/types";
import { recipeFormSchema } from "@/types/zodSchemas";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { user } = session;

    const json = await req.json();
    json.createdAt = new Date(json.createdAt);
    const recipe = recipeFormSchema.parse(json);

    const id = recipeId(recipe.title) || recipe.id;

    // get all ingredients and set them, only include ingredients that have isHeading set to false
    const ingredientsList = recipe?.ingredients
      ?.filter((ingredient) => !ingredient.isHeading && ingredient.title)
      .map((ingredient) => {
        ingredient.title =
          ingredient.title.charAt(0).toUpperCase() + ingredient.title.slice(1);

        return ingredient.title;
      });

    // define the new recipe
    const newRecipe: NewRecipe = {
      ...recipe,
      id: id,
      title: recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1),
      ingredientsList: ingredientsList,
    };

    const setRecipe = await db
      .update(recipes)
      .set(newRecipe)
      .where(eq(recipes.uid, recipe.uid));

    console.log(`Edited recipe ${newRecipe.uid}`, {
      message: `Recipe successfully edited, ${setRecipe}`,
      recipe: newRecipe,
    });

    return NextResponse.json(
      {
        message: `Recipe successfully edited, ${setRecipe}`,
        recipe: newRecipe,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error on /recipes/[id]/edit", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
}
