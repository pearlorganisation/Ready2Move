import MySlugProperty from "@/components/MySlugProperty";
import { getSinglePropertyBySlug } from "@/lib/serverActions/propertyOg";
 import type { Metadata } from 'next';

 // You must create this or import from wherever you fetch property details.

export async function generateMetadata(params: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
 const { slug } = await params.params;
  // Fetch property details from your backend or API using the slug
  const property = await getSinglePropertyBySlug(slug);
  console.log("the property is", property)
  if (!property) {
    return {
      title: "Property Not Found",
    };
  }
  console.log("property?.imageGallery?.[0]?.secure_url",property?.imageGallery?.[0]?.secure_url)
  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [property?.imageGallery?.[0]?.secure_url
      ],
      type: "website",
    },
  };
}

export default async function ProjectDetails(params:{
  params:Promise<{slug:string}>
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-20">
      <MySlugProperty slug={slug} />
    </div>
  );
}
