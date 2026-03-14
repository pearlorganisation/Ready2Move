import { MetadataRoute } from "next";

const BASE_URL = "https://ready2move.co.in";
const API_URL = "https://api.ready2move.co.in/";

async function fetchSlugs(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 3600 } // cache 1 hour
    });

    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);

    const data = await res.json();

    return data?.data || [];

  } catch (error) {
    console.error("Sitemap Fetch Error:", endpoint, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const [blogs, projects, properties] = await Promise.all([
    fetchSlugs("/api/v1/blogs/sitemap"),
    fetchSlugs("/api/v1/projects/sitemap"),
    fetchSlugs("/api/v1/properties/sitemap"),
  ]);

  const blogEntries = blogs.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectEntries = projects.map((project: any) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const propertyEntries = properties.map((property: any) => ({
    url: `${BASE_URL}/properties/${property.slug}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/home`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/projects`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/properties`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/FAQ`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/privacy-policy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms-condition`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

  return [
    ...staticRoutes,
    ...blogEntries,
    ...projectEntries,
    ...propertyEntries,
  ];
}