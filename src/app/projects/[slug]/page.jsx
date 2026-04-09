import MySlugComp from "@/components/MySlugComp";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `https://api.ready2move.co.in/api/v1/projects/${params?.slug}`,
    { cache: "no-store" }
  );

  const projectData = await res.json();
  const data = projectData?.data;

  const ogData = data?.ogMetaField || {};

  const title =
    ogData?.ogTitle?.trim() || data?.title || "Project Preview";

  const description =
    ogData?.ogDescription?.trim() ||
    data?.description ||
    "Explore this project";

  const ogImageUrl =
    ogData?.ogImage?.secure_url ||
    data?.imageGallery?.[0]?.secure_url ||
    "https://ready2move.co.in/RS.png";

  const pageUrl = `https://ready2move.co.in/projects/${params?.slug}`;

  return {
    metadataBase: new URL("https://ready2move.co.in"),

    title,
    description,

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

export default function ProjectDetails({ params }) {
  const { slug } = params; 

  return (
    <div className="mt-2">
      <MySlugComp slug={slug} />
    </div>
  );
}