import { MetadataRoute } from 'next';

// 1. Define your base URL and API URL
const BASE_URL = 'https://ready2move.co.in';
const API_URL = 'https://api.ready2move.co.in';

// 2. Helper function to fetch data safely
async function fetchSlugs(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    const data = await res.json();
    
    // Adjust this depending on your API response structure. 
    // Example: if your API returns { data: [...] }, use data.data.
    // Here we assume it returns an array of objects like [{ slug: '...' }]
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error(`Sitemap Error: Could not fetch ${endpoint}`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  // 3. Fetch Dynamic Data
  // Verify these endpoints match your actual backend routes
  const blogs = await fetchSlugs('/api/blogs');         
  const projects = await fetchSlugs('/api/projects');   
  const properties = await fetchSlugs('/api/properties'); 

  // 4. Generate Dynamic Entries
  const blogEntries: MetadataRoute.Sitemap = blogs.map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.createdAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.map((property: any) => ({
    url: `${BASE_URL}/properties/${property.slug}`,
    lastModified: new Date(property.updatedAt || property.createdAt || new Date()),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 5. Define Static Routes (Manual list based on your file structure)
  // Note: We exclude '/admin', '(auth)', and internal folders like 'components'
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`, // Main blog list page
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`, // Main projects list page
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/properties`, // Main properties list page
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/FAQ`, // Note: Case sensitive if folder is named FAQ
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-condition`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 6. Combine and Return
  return [
    ...staticRoutes,
    ...blogEntries,
    ...projectEntries,
    ...propertyEntries,
  ];
}