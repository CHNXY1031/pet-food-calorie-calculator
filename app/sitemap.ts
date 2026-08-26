import type { MetadataRoute } from "next";
import { catBreeds, dogBreeds } from "@/lib/petData";

const BASE_URL = 'https://pet-food-calorie-calculator.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...dogBreeds.map((breed) => ({
      url: `${BASE_URL}/dog-food-calculator/${breed.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...catBreeds.map((breed) => ({
      url: `${BASE_URL}/cat-food-calculator/${breed.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
