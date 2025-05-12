import type { Metadata } from 'next';
import MySlugComp from "@/components/MySlugComp";

export async function generateMetadata(params: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  // Extract slug the same way as in your page component
  const { slug } = await params.params;
  
  try {
    const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`);
    const project = (await res.json())?.data;

    return {
      title: project?.title || 'Project Details',
      description: project?.description || 'View project details on Ready2Move',
      openGraph: {
        title: project?.title || 'Ready2Move Project',
        description: project?.description || '',
        images: [
          {
            url: `https://ready2move.co.in/projects/${slug}/opengraph-image`,
            width: 1200,
            height: 630,
          },
        ],
        url: `https://ready2move.co.in/projects/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: project?.title || 'Ready2Move Project',
        description: project?.description || '',
        images: [`https://ready2move.co.in/projects/${slug}/opengraph-image`],
      },
    };
  } catch (error) {
    return {
      title: 'Project Details',
      description: 'View project details on Ready2Move',
    };
  }
}


export default async function ProjectDetails(params:{
  params:Promise<{slug: string}>
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-20">
      <MySlugComp slug={slug} />
    </div>
  );
}

 