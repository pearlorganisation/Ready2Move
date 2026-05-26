import MySlugProperty from "@/components/MySlugProperty";



export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `https://api.ready2move.co.in/api/v1/properties/${params.slug}`,
    {
      cache: "no-store",
    }
  );

  const projectData = await res.json();
  const data = projectData?.data;

  const ogData = data?.ogMetaField || {};

  const title =
    ogData?.ogTitle?.trim() ||
    data?.title ||
    "Project Preview";

  const description =
    ogData?.ogDescription?.trim() ||
    data?.description?.slice(0, 160) ||
    "Explore this project";

  const ogImageUrl =
    ogData?.ogImage?.secure_url ||
    data?.imageGallery?.[0]?.secure_url ||
    "https://ready2move.co.in/RS.png";

  const pageUrl = `https://ready2move.co.in/properties/${params.slug}`;

  return {
    metadataBase: new URL("https://ready2move.co.in"),

    title,
    description,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      siteName: "Ready2Move",

      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],

      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },

    robots: {
      index: true,
      follow: true,
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
