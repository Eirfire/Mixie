import { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://mixiecooking.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://mixiecooking.com/sitemap-recipes.xml",
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://mixiecooking.com/sitemap-blogs.xml",
      priority: 1,
    },
    {
      url: "https://mixiecooking.com/recipes",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://mixiecooking.com/info/privacy_policy",
      lastModified: new Date("2023-12-14"),
    },
    {
      url: "https://mixiecooking.com/info/terms_service",
      lastModified: new Date("2023-11-01"),
    },
    {
      url: "https://mixiecooking.com/info/about",
      lastModified: new Date("2023-11-14"),
    },
  ];
}
