import ProjectPage from "./ProjectPage";



export const dynamic = "force-dynamic";

export async function generateMetadata() {
  try {
    const res = await fetch(
      "https://api.ready2move.co.in/api/v1/meta/all",
      {
        cache: "no-store",
      }
    );

    const projectData = await res.json();

    const data = projectData?.data;

    const title =
      data?.ogTitle?.trim() ||
      "Project Preview";

    const description =
      data?.ogDescription?.trim() ||
      "Explore these projects";

    const ogImageUrl =
      data?.ogImage?.secure_url ||
      "https://ready2move.co.in/RS.png";

    const pageUrl = "https://ready2move.co.in/projects";

    return {
      metadataBase: new URL("https://ready2move.co.in"),
      title,
      description,
      openGraph: {
        title,
        description,
       type: data?.ogType || "website",
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
  } catch (error) {
    console.log(error);

    return {
      title: "Properties",
      description: "Explore properties",
    };
  }
}

export default function Page() {
  return (
    <div className="mt-2">
      <ProjectPage />
    </div>
  );
}
