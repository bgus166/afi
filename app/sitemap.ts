import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/how-it-works`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/case-studies`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/pricing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/solutions/for-d2c-brands`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/solutions/for-marketplace-sellers`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/solutions/for-affiliate-brands`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/services/afiassist`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/services/aficreator`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/services/afiinsight`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/services/afiflow`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
