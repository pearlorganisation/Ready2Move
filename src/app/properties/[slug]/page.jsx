export async function generateMetadata({ params }) {
  const res = await fetch(
    `https://api.ready2move.co.in/api/v1/properties/${params.slug}`,
    { cache: "no-store" }
  );

  const projectData = await res.json();

  const title = projectData?.data?.title ?? "Project Preview";
  const description =
    projectData?.data?.description ?? "Explore this project";

  const ogImageUrl =
    projectData?.data?.imageGallery?.[0]?.secure_url ||
    "https://ready2move.co.in/RS.png";

  const pageUrl = `https://ready2move.co.in/properties/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
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
    <div className="mt-2">
      <MySlugProperty slug={params.slug} />
    </div>
  );
}
