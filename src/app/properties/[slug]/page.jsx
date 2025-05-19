export const dynamic = 'force-dynamic';

import MySlugProperty from "@/components/MySlugProperty";
import axios from "axios";
//  import type { Metadata } from 'next';

 // You must create this or import from wherever you fetch property details.

async function getPropertyBySlug(slug) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DEV_BASE_URL}/api/v1/properties/${slug}`); //https://api.ready2move.co.in/api/v1/properties/${slug}
    return res.data.data; // This is how you access data with Axios
  } catch (err) {
    console.error("Failed to fetch property", err);
    return null;
  }
}




export async function generateMetadata({params}){
 const { slug } =  params;
  // Fetch property details from your backend or API using the slug
  // const property = await getSinglePropertyBySlug(slug);
  const property = await getPropertyBySlug(slug);
  // console.log("the property is", property)
  if (!property) {
    return {
      title: "Property Not Found",
    };
  }
  console.log("property?.imageGallery?.[0]?.secure_url",property?.imageGallery?.[0]?.secure_url)
  const imageUrl = property?.imageGallery?.[0]?.secure_url;
  return {
    title: property?.title,
    description: property?.description,
    openGraph: {
      title: property?.title,
      description: property?.description.slice(1,180),
      images: [imageUrl
      ],
      type: "website",
    },
    twitter: {
    card: "summary_large_image",
    title:property?.title,
    description:property?.description.slice(1,180)
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
