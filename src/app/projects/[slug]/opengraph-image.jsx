// import { ImageResponse } from 'next/og';

// export const alt = 'Project Preview'; // This alt is for the <meta property="og:image:alt">, not the <img> inside
// export const size = {
//     width: 1200,
//     height: 630,
// };
// export const contentType = 'image/png';

// export default async function Image({ params }) {
//     const slug = params.slug;
//     console.log(`[OG IMAGE GEN] Starting for slug: ${slug}`);

//     try {
//         const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`, {
//             headers: { 'Content-Type': 'application/json' },
//             cache: 'no-store',
//         });
//         console.log(`[OG IMAGE GEN] API response status for ${slug}: ${res.status}`);

//         if (!res.ok) {
//             const errorText = await res.text(); // Get more info on API error
//             console.error(`[OG IMAGE GEN] API fetch failed for ${slug} with status ${res.status}. Body: ${errorText}`);
//             throw new Error(`Failed to fetch project data (status: ${res.status})`);
//         }

//         const post = await res.json();
//         // Log the entire 'post' object to see its structure
//         // console.log(`[OG IMAGE GEN] Raw API 'post' data for ${slug}:`, JSON.stringify(post, null, 2));

//         const project = post?.data;

//         // CRITICAL: Log the project object that you expect 'imageGallery' to be in
//         if (!project) {
//             console.error(`[OG IMAGE GEN] 'project' (post.data) is undefined or null for slug: ${slug}. Full post:`, JSON.stringify(post, null, 2));
//             throw new Error('Project data (post.data) is missing or malformed.');
//         }
//         console.log(`[OG IMAGE GEN] 'project' (post.data) for slug ${slug}:`, JSON.stringify(project, null, 2));

//         // CRITICAL: Log the imageGallery and the extracted URL
//         const imageGallery = project?.imageGallery;
//         console.log(`[OG IMAGE GEN] 'project.imageGallery' for slug ${slug}:`, JSON.stringify(imageGallery, null, 2));

//         const imageUrl = project?.imageGallery?.[0]?.secure_url;
//         console.log(`[OG IMAGE GEN] Extracted 'imageUrl' for slug ${slug}: ${imageUrl}`);

//         const projectTitleForDisplay = project?.title || 'Project Preview';

//         if (!imageUrl) {
//             console.warn(`[OG IMAGE GEN] imageUrl is FALSY for slug ${slug}. Will render fallback text with title: "${projectTitleForDisplay}".`);
//         }

//         return new ImageResponse(
//             (
//                 <div // Outer container
//                     style={{
//                         background: 'linear-gradient(to right, #1f2937, #111827)',
//                         color: 'white',
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex', // Crucial for centering and sizing content
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         padding: '20px', // Optional: if you want padding around the image
//                         textAlign: 'center',
//                     }}
//                 >
//                     {imageUrl ? (
//                         <img
//                             src={imageUrl}
//                             alt={projectTitleForDisplay} // Use the fetched title
//                             style={{
//                                 // Let the image define its own aspect ratio
//                                 // but constrain it to the container
//                                 width: 'auto', // Use 'auto' or a specific value if needed
//                                 height: 'auto', // Use 'auto' or a specific value if needed
//                                 maxWidth: '100%', // Ensure it doesn't overflow parent
//                                 maxHeight: '100%', // Ensure it doesn't overflow parent
//                                 objectFit: 'contain', // 'contain' is usually best to see the whole image
//                             }}
//                         // Satori might require width/height on img if not using flex/TW properly
//                         // If issues persist, try adding explicit width/height to img:
//                         // width={1160} // e.g. size.width - padding
//                         // height={590} // e.g. size.height - padding
//                         />
//                     ) : (
//                         <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white', padding: '40px' }}>
//                             {projectTitleForDisplay}
//                             <div style={{ fontSize: 24, marginTop: 20 }}>(Image URL not found in API data)</div>
//                         </div>
//                     )}
//                 </div>
//             ),
//             {
//                 ...size,
//             }
//         );
    
//     } 
    
//     catch (error) {
//         console.error(`Error generating OG image for slug ${slug}:`, error.message);

//         // Fallback error image
//         return new ImageResponse(
//             (
//                 <div
//                     style={{
//                         fontSize: 48,
//                         background: '#f8d7da', // Light red background for error
//                         color: '#721c24',     // Dark red text for error
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         padding: '40px',
//                         textAlign: 'center',
//                     }}
//                 >
//                     Project Image Not Available
//                 </div>
//             ),
//             { ...size }
//         );
//     }
// }

import { ImageResponse } from 'next/og';

export const alt = 'Project Preview';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
    const slug = params.slug;
    console.log(`[OG IMAGE GEN SIMPLIFIED 1] Starting for slug: ${slug}`);

    try {
        const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });
        console.log(`[OG IMAGE GEN SIMPLIFIED 1] API status for ${slug}: ${res.status}`);

        if (!res.ok) {
            console.error(`[OG IMAGE GEN SIMPLIFIED 1] API fetch failed for ${slug}: ${res.status}`);
            throw new Error(`API failed (status: ${res.status})`);
        }

        const post = await res.json();
        const project = post?.data;

        if (!project) {
            console.error(`[OG IMAGE GEN SIMPLIFIED 1] No project data (post.data) for ${slug}.`);
            throw new Error('Project data missing.');
        }
        console.log(`[OG IMAGE GEN SIMPLIFIED 1] Project data for ${slug}:`, JSON.stringify(project, null, 2));


        const imageUrl = project?.imageGallery?.[0]?.secure_url;
        console.log(`[OG IMAGE GEN SIMPLIFIED 1] Extracted imageUrl for ${slug}: ${imageUrl}`);

        if (!imageUrl) {
            console.error(`[OG IMAGE GEN SIMPLIFIED 1] imageUrl is MISSING for ${slug}! Will show text fallback.`);
            return new ImageResponse(
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'blue', color: 'white', fontSize: 30 }}>
                    Image URL not found for {project?.title || 'project'}.
                </div>,
                { ...size }
            );
        }

        console.log(`[OG IMAGE GEN SIMPLIFIED 1] Attempting to render image with src: ${imageUrl}`);
        return new ImageResponse(
            (
                <div style={{ // This div is crucial for Satori to have a root layout element
                    width: '100%',
                    height: '100%',
                    display: 'flex', // Use flex to control image
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'lightgray', // So we can see the canvas
                }}>
                    <img
                        src={imageUrl}
                        alt="Project" // Simple alt
                        // Satori/ImageResponse often requires explicit width/height on the img tag itself
                        // especially if the parent isn't using Tailwind or more complex flex setups.
                        width={size.width - 40} // Example: fill most of the canvas with some padding
                        height={size.height - 40}
                        style={{
                            objectFit: 'contain', // Important
                        }}
                    />
                </div>
            ),
            {
                ...size,
                // For debugging, remove custom fonts for now
            }
        );

    } catch (error) {
        console.error(`[OG IMAGE GEN SIMPLIFIED 1] CATCH BLOCK for ${slug}:`, error.message, error.stack);
        return new ImageResponse(
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'red', color: 'white', fontSize: 30, padding: 20, textAlign: 'center' }}>
                ERROR generating image for {slug}: {error.message}
            </div>,
            { ...size }
        );
    }
}