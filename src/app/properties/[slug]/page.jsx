export const dynamic = 'force-dynamic';

import MySlugProperty from "@/components/MySlugProperty";
import axios from "axios";
//  import type { Metadata } from 'next';

 // You must create this or import from wherever you fetch property details.

async function getPropertyBySlug(slug) {
  try {
    const res = await axios.get(`https://api.ready2move.co.in/api/v1/properties/${slug}`); //https://api.ready2move.co.in/api/v1/properties/${slug}
    return res.data.data; // This is how you access data with Axios
  } catch (err) {
    console.error("Failed to fetch property", err);
    return null;
  }
}




export async function generateMetadata({ params }) {
  const { slug } = params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  const imageUrl = property?.imageGallery?.[0]?.secure_url || "https://yourdomain.com/default-og-image.jpg";
  const description = property?.description?.slice(0, 180) || "Find amazing properties on Ready2Move";

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: [imageUrl],
      type: "website",
      url: `https://ready2move.co.in/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: [imageUrl],
    },
  };
}


export default  function Page({params}) {


  return (
    <div className="mt-20">
      <MySlugProperty slug={params.slug} />
    </div>
  );
}
