import RecipeForm from "@/components/recipe-form/recipe-form";
import { db } from "@/server/db/index";
import { recipes as recipeSchema } from "@/server/db/schemas";
import { getServerAuthSession } from "@/server/auth";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPage({ params }: EditPageProps) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/login");
  }

  const recipe = await db.query.recipes.findFirst({
    where: and(
      eq(recipeSchema.createdBy, session.user.id),
      eq(recipeSchema.uid, params.id)
    ),
  });

  // return <RecipeForm recipe={mockRecipe} />;
  if (recipe) return <RecipeForm recipe={recipe} />;

  return notFound();
}
