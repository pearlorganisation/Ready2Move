// import type { Metadata } from 'next';
// app/projects/[slug]/page.tsx

import MySlugComp from "@/components/MySlugComp";
 
export async function generateMetadata({ params }) {
  // const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${params.slug}`);
  // const project = await res.json();
  // console.log("the res is", project);
  // const title = project?.data?.title ?? 'Project Preview';
  // const imageUrl = project?.data?.imageGallery?.[0]?.secure_url
  // return {
  //   title,
  //   openGraph: {
  //     title,
  //     description: project?.data?.description ?? "Explore this project",
  //     type: 'website',
  //     locale: 'en_US',
  //     url: `https://ready2move.co.in/projects/${params.slug}`,
  //     images: [
  //       {
  //         url: `https://ready2move.co.in/projects/${params.slug}/opengraph-image`,
  //         // url:imageUrl,
  //         width: 1200,
  //         height: 630,
  //         alt: title,
  //       },
  //     ],
  //   },
  //   twitter: {
  //     card: "summary_large_image",
  //     title,
  //     description: project?.data?.description ?? "Explore this project",
  //     images: [`https://ready2move.co.in/projects/${params.slug}/opengraph-image`],
  //     // images: [imageGallery]
  //   },
  // };

  const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${params.slug}`);
  const projectData = await res.json(); // Renamed to avoid conflict with 'project' variable name if you declare one later
  // console.log("the res is", projectData);
  const title = projectData?.data?.title ?? 'Project Preview';
  const description = projectData?.data?.description ?? "Explore this project";
  const pageUrl = `https://ready2move.co.in/projects/${params.slug}`; // The canonical URL of THIS page
  const ogImageUrl = `${pageUrl}/opengraph-image`; // The URL for the OG image itself

  return {
    title,
    openGraph: {
      title,
      description,
      type: 'website', // or 'article' if more appropriate
      locale: 'en_US',
      url: pageUrl, // **** THIS IS THE KEY TAG FOR THE LINK BACK ****
      images: [
        {
          url: ogImageUrl, // Correct: points to the image generation route
          width: 1200,
          height: 630,
          alt: title,
          // type: 'image/png' // You can optionally add this
        },
        // You can add more images if desired, Facebook will pick one or let user choose
        // { url: projectData?.data?.imageGallery?.[0]?.secure_url } // For example, if you wanted to offer the raw image too
      ],
      // siteName: 'Ready2Move' // Optional but good for branding
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // site: "@yourTwitterHandle", // Optional
      // creator: "@authorTwitterHandle", // Optional
      images: [ogImageUrl], // Correct: points to the image generation route
    },
    // Optional: Add a canonical link tag directly as well for SEO best practices
    // It's often redundant if og:url is set, but doesn't hurt.
    // alternates: {
    //   canonical: pageUrl,
    // },
  };
}

export default async function ProjectDetails({ params }) {
  const { slug } = params;

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