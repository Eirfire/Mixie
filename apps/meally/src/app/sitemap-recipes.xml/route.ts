export const dynamic = "force-dynamic"; // defaults to force-static
import { db } from "@/src/server/db";

export async function GET() {
  const recipes = await db.query.info.findMany({});

  return new Response(`
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
      ${recipes
        .map((data) => {
          const time = data.lastUpdated || data.createdAt;
          return `
            <url>
                <loc>${`https://meally.com.au/recipes/${data.id}`}</loc>
                <lastmod>${time.toString()}</lastmod>
            </url>
          `;
        })
        .join("")}
  </urlset>
  `);
}
