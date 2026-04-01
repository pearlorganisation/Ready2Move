import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function GenerateOgMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  try {
    // 1. Fetch data from your actual API endpoint
    // Replace with your actual domain or environment variable
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/v1/properties/${slug}`, {
      cache: "no-store",
    });

    const json = await res.json();
    
    // Safety check if property not found
    if (!json.success || !json.data) {
      return { title: "Property Not Found" };
    }

    const property = json.data;

    // 2. Extract SEO values from your specific JSON structure
    // Priority: ogMetaField values -> fallback to main property values -> default string
    const seoTitle = property.ogMetaField?.ogTitle || property.title || "Property Details";
    const seoDescription = property.ogMetaField?.ogDescription || property.description || "Explore property details.";
    
    // Priority: ogImage -> first gallery image -> default logo
    const seoImage = 
      property.ogMetaField?.ogImage?.secure_url || 
      property.imageGallery?.[0]?.secure_url || 
      "/RS.png";

    return {
      title: seoTitle,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: `https://yourwebsite.com/property/${slug}`, // Update with your domain
        siteName: "Ready2Move",
        images: [
          {
            url: seoImage,
            width: 1200,
            height: 630,
            alt: seoTitle,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [seoImage],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Ready2Move Property",
    };
  }
}