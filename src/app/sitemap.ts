import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultPages: MetadataRoute.Sitemap = [
    {
      url: "https://jedwal.co",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://jedwal.co/tos",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://jedwal.co/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const sitemap = [...defaultPages];
  return sitemap;
}
