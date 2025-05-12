// import { ImageResponse } from 'next/og';

// export const alt = 'Project Preview';
// export const size = {
//   width: 1200,
//   height: 630,
// };
// export const contentType = 'image/png';

// export default async function Image({ params }: { params: { slug: string } }) {
//   const slug = params.slug;

//   try {
//     const res = await fetch(`http://localhost:5000/api/v1/projects/${slug}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-store',
//     });

//     const post = await res.json();
//     const project = post?.data;

//     console.log("image gallery is", project?.imageGallery);

//     const imageUrl = 'https://res.cloudinary.com/dcycgqmut/image/upload/v1745231815/R2M/Banner/l4rdswgpoagw4ligpmaw.jpg'
//     // project?.imageGallery?.[0]?.secure_url;

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             fontSize: 48,
//             fontWeight: 'bold',
//             color:  'white', 
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '20px',
//             textAlign: 'center',
//           }}
//         >
//         <img
//             src={imageUrl}
//             alt="Project"
//             width={1200}
//             height={630}
//             style={{ objectFit: 'cover' }}
//           />        
//           </div>
//       ),
//        {
//         width: 1200,
//         height: 630,
//        }
//     );
//   } catch (error) {
//     console.error('Error generating OG image:', error);

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             fontSize: 40,
//             background: '#f8d7da',
//             color: '#721c24',
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           Project Not Found
//         </div>
//       ),
//       size
//     );
//   }
// }
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const alt = 'Project Preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const canvas = createCanvas(size.width, size.height);
  const ctx = canvas.getContext('2d');

  try {
    // Use localhost in development, replace with your API URL in production
    const apiUrl = `https://api.ready2move.co.in/api/v1/projects/${slug}`
  

    const res = await fetch(apiUrl, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch project');

    const post = await res.json();
    const project = post?.data;

    // Use project image or fallback
    const imageUrl = project?.imageGallery?.[0]?.secure_url || 
      'https://res.cloudinary.com/dcycgqmut/image/upload/v1745231815/R2M/Banner/l4rdswgpoagw4ligpmaw.jpg';

    // Load and draw background image
    const bgImage = await loadImage(imageUrl);
    ctx.drawImage(bgImage, 0, 0, size.width, size.height);

    // Add text overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, size.height - 200, size.width, 200);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    // Title
    ctx.font = 'bold 60px "Arial"';
    ctx.fillText(
      project?.title || 'Project Preview', 
      size.width / 2, 
      size.height - 120,
      size.width - 100
    );
    
    // Description (if exists)
    if (project?.description) {
      ctx.font = '30px "Arial"';
      ctx.fillText(
        project.description, 
        size.width / 2, 
        size.height - 60,
        size.width - 100
      );
    }

    // Convert to buffer
    const buffer = canvas.toBuffer('image/png');
    
    // Optional: Save for debugging
    // if (process.env.NODE_ENV === 'development') {
    //   writeFileSync(join(process.cwd(), 'public', 'og-debug.png'), buffer);
    // }

    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });

  } catch (error) {
    console.error('Error generating OG image:', error);

    // Fallback error image
    ctx.fillStyle = '#f8d7da';
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.fillStyle = '#721c24';
    ctx.font = 'bold 60px "Arial"';
    ctx.textAlign = 'center';
    ctx.fillText('Project Not Found', size.width / 2, size.height / 2);

    const buffer = canvas.toBuffer('image/png');
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }
}