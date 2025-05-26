import MySlugProperty from "@/components/MySlugProperty";
import axios from "axios";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `https://api.ready2move.co.in/api/v1/properties/${params.slug}`
  );
  const projectData = await res.json();
  const title = projectData?.data?.title ?? "Project Preview";
  const description = projectData?.data?.description ?? "Explore this project";
  const pageUrl = `https://ready2move.co.in/properties/${params.slug}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`;
  return {
    title,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function Page({ params }) {
  return (
    <div className="mt-20">
      <MySlugProperty slug={params.slug} />
    </div>
  );
}
