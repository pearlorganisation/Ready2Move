import BlogDetails from "@/components/BlogDetails";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `https://api.ready2move.co.in/api/v1/blogs/${params?.slug}`,
    { cache: "no-store" }
  );

  const blogData = await res.json();
  const data = blogData?.data;

  const ogData = data?.ogMetaField || {};

  // ✅ USE OG FIRST
  const title =
    ogData?.ogTitle?.trim() || data?.title || "Blog Preview";

  const description =
    ogData?.ogDescription?.trim() ||
    "Read this blog on Ready2Move";

  const ogImageUrl =
    ogData?.ogImage?.secure_url ||
    data?.thumbImage?.secure_url ||
    "https://ready2move.co.in/RS.png";

  const pageUrl = `https://ready2move.co.in/blog/${params.slug}`;

  return {
    metadataBase: new URL("https://ready2move.co.in"),

    title,
    description,

    openGraph: {
      title,
      description,
      type: "article", 
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
  const slug = params.slug;

  return (
    <div className="mt-2">
      <BlogDetails slug={slug} />
    </div>
  );
}