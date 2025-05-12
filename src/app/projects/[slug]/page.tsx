import type { Metadata } from 'next';
import MySlugComp from "@/components/MySlugComp";

export async function generateMetadata(params: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  // Extract slug the same way as in your page component
  const { slug } = await params.params;
  // console.log("the slug is", slug)
  try {
    const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`);
    // console.log("the res is", res)
    const project = (await res.json())?.data;

    console.log("the project image gallery is",project?.imageGallery?.[0]?.secure_url)
     return {
      title: project?.title || 'Project Details',
      description: project?.description || 'View project details on Ready2Move',
      openGraph: {
        title: project?.title || 'Ready2Move Project',
        description: project?.description || '',
        images:`${project?.imageGallery?.[0]?.secure_url}`,
        url: `https://ready2move.co.in/projects/${slug}`,
        type: 'website',
        locale: 'en_US',
        siteName: 'Ready2Move',
      }
      // twitter: {
      //   card: 'summary_large_image',
      //   title: project?.title || 'Ready2Move Project',
      //   description: project?.description || '',
      //   images: [`https://ready2move.co.in/projects/${slug}/opengraph-image`],
      // },
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

 