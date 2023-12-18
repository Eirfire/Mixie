import { currentUser } from "@clerk/nextjs";
import RecipePageComponent from "@components/templates/RecipePage/RecipePageComponent";
import { db } from "@db/index";
import { recipes as recipeSchema } from "@db/schemas";
import type { Recipe } from "@db/types";
import { and, eq, or } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

interface PreviewRecipePageProps {
  params: {
    id: string;
  };
}

export default async function PreviewRecipePage({
  params,
}: PreviewRecipePageProps) {
  const user = await currentUser();
  if (!user) {
    return redirect("/auth/login");
  }

  const recipe = await db.query.recipes.findFirst({
    with: { info: true },
    where: and(
      or(
        eq(recipeSchema.lastUpdatedBy, user.id),
        eq(recipeSchema.createdBy, user.id)
      ),
      eq(recipeSchema.uid, params.id)
    ),
  });

  if (!recipe) {
    return notFound();
  }

  return (
    <>
      <RecipePageComponent recipe={recipe as Recipe} />
    </>
  );
}
