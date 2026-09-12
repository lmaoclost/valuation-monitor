import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://valuation-monitor.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/stocks/br`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/stocks/usa`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/stocks/br-fii`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/stocks/usa-reit`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/coverage`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/docs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/privacidade`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
