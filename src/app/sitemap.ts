import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    "/",
    "/use-cases",
    "/pricing",
    "/docs",
    "/blog",
    "/about",
    "/contact",
    "/product",
    "/how-it-works",
    "/integrations",
    "/security",
    "/roadmap",
    "/investors",
    "/team",
    "/terms",
    "/privacy",
    "/cookies",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
