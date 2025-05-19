import type { Metadata } from 'next';
import MySlugComp from "@/components/MySlugComp";

 

export default async function ProjectDetails(params: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-20">
      <MySlugComp slug={slug} />
    </div>
  );
}

 // export async function generateMetadata(params: {
//   params: Promise<{ slug: string }>
// }): Promise<Metadata> {
//   // Extract slug the same way as in your page component
//   const { slug } = await params.params;
//   // console.log("the slug is", slug)
//   try {
//     const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`);
//     // console.log("the res is", res)
//     const project = (await res.json())?.data;

//     console.log("the project image gallery is",project?.imageGallery?.[0]?.secure_url)
//      return {
//       title: project?.title || 'Project Details',
//       description: project?.description || 'View project details on Ready2Move',
//       openGraph: {
//         title: project?.title || 'Ready2Move Project',
//         description: project?.description || '',
//         images:'https://res.cloudinary.com/dcycgqmut/image/upload/v1745231815/R2M/Banner/l4rdswgpoagw4ligpmaw.jpg' 
//         // `${project?.imageGallery?.[0]?.secure_url}`
//         ,
//         url: `https://ready2move.co.in/projects/${slug}`,
//         type: 'website',
//         locale: 'en_US',
//         siteName: 'Ready2Move',
//       }
//     };
//   } catch (error) {
//     return {
//       title: 'Project Details',
//       description: 'View project details on Ready2Move',
//     };
//   }
// }


// export async function generateMetadata(params: {
//   params: Promise<{ slug: string }>
// }): Promise<Metadata> {
//   const { slug } = await params.params;
  
//   try {
//     const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`);
//     const project = (await res.json())?.data;

//     // Use first image from gallery or fallback
//     const imageUrl = project?.imageGallery?.[0]?.secure_url || 
//       'https://res.cloudinary.com/dcycgqmut/image/upload/v1745231815/R2M/Banner/l4rdswgpoagw4ligpmaw.jpg';

//     return {
//       title: project?.title || 'Project Details',
//       description: project?.description || 'View project details on Ready2Move',
//       metadataBase: new URL('https://ready2move.co.in'),
//       openGraph: {
//         title: project?.title || 'Ready2Move Project',
//         description: project?.description || '',
//         images: [
//           {
//             url: imageUrl,
//             width: 1200,
//             height: 630,
//             alt: project?.title || 'Ready2Move Project Image',
//           },
//         ],
//         url: `/projects/${slug}`,
//         type: 'website',
//         locale: 'en_US',
//         siteName: 'Ready2Move',
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: project?.title || 'Ready2Move Project',
//         description: project?.description || '',
//         images: {
//           url: imageUrl,
//           alt: project?.title || 'Ready2Move Project Image',
//         },
//       },
//     };
//   } catch (error) {
//     return {
//       title: 'Project Details',
//       description: 'View project details on Ready2Move',
//     };
//   }
// }