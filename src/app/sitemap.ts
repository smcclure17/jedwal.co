import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL for the site
  const baseUrl = "https://jedwal.co";

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/roadmap-and-release-notes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Utility pages (excluding app/app/ dashboard pages)
  const utilityPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/unsubscribe-success`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/unsubscribe-error`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Note: We're intentionally excluding the app/app/ directory pages
  // as they appear to be dashboard pages that should be routed to a subdomain
  // and shouldn't be indexed in the main sitemap

  // Combine all pages
  const sitemap = [...mainPages, ...legalPages, ...utilityPages];
  return sitemap;
}
