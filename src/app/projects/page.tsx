import ProjectPage from "./ProjectPage";


type MetaItem = {
  ogType: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    secure_url?: string;
  };
};






type ApiResponse = {
  data: MetaItem[];
};

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  try {
    const res = await fetch(
      "https://api.ready2move.co.in/api/v1/meta/all",
      {
        cache: "no-store",
      }
    );

    const projectData: ApiResponse = await res.json();
    // ✅ filter only project type
    const projectMeta = projectData?.data?.find(
      (item) => item.ogType === "project"
    );

    const title =
      projectMeta?.ogTitle?.trim() || "Project Preview";

    const description =
      projectMeta?.ogDescription?.trim() || "Explore these projects";

    const ogImageUrl =
      projectMeta?.ogImage?.secure_url ||
      "https://ready2move.co.in/RS.png";

    const pageUrl = "https://ready2move.co.in/projects";

    return {
      metadataBase: new URL("https://ready2move.co.in"),

      title, // ✅ fixed (you had ogtitle bug)

      description,

      openGraph: {
        title,
        description,
        type: "website", // ✅ fixed (your code had syntax error)
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
      title: "Projects",
      description: "Explore projects",
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
