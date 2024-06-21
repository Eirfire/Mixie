import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth", "/admin", "/recipes/preview"],
    },
    sitemap: [
      "https://mixiecooking.com/sitemap.xml",
      "https://mixiecooking.com/sitemap-recipes.xml",
    ],
  };
}
