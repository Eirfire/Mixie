import RecipeForm from "@/src/common/components/templates/RecipeForm/RecipeForm";
import { db } from "@db/index";
import { recipes as recipeSchema } from "@db/schemas";
import { getServerAuthSession } from "@server/auth";
import { and, eq, or } from "drizzle-orm";
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
      or(
        eq(recipeSchema.lastUpdatedBy, session.user.id),
        eq(recipeSchema.createdBy, session.user.id)
      ),
      eq(recipeSchema.uid, params.id)
    ),
    with: {
      info: true,
    },
  });

  // return <RecipeForm recipe={mockRecipe} />;
  if (recipe) return <RecipeForm recipe={recipe} />;

  return notFound();
}