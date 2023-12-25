import { SearchCard } from "@/src/common/components/elements/Cards";
import { db } from "@db/index";
import { getServerAuthSession } from "@server/auth";
import { notFound } from "next/navigation";

export default async function BookmarksPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return notFound();
  }

  const gotRecipes = await db.query.bookmarks.findMany({
    with: {
      recipe: {
        columns: {
          id: true,
          title: true,
          imgUrl: true,
          imgAlt: true,
          total: true,
          keywords: true,
        },
      },
    },
  });

  return (
    <div className="mt-4">
      <h1 className="mb-2 text-center text-step0">Bookmarked Recipes</h1>
      <ul className="flex flex-row flex-wrap justify-center gap-4">
        {gotRecipes.map((recipe, index) => {
          return (
            <SearchCard
              as="li"
              key={index}
              recipe={{
                ...recipe.recipe,
                uid: recipe.recipeId,
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}