
import type { Metadata } from 'next';
import MySlugComp from "@/components/MySlugComp";

export async function generateMetadata(params:{
  params:Promise<{slug: string}>
})  {
  // Fetch project data for metadata
  // const slug = await params.slug
  const { slug } = await params.params;
  const res = await fetch(`https://ready2move.co.in/api/v1/projects/${slug}`);
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

