import type { MetadataRoute } from "next";

const BASE_URL = "https://pet-food-calorie-calculator.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
