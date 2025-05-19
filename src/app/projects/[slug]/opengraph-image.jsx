import { ImageResponse } from 'next/og';

export const alt = 'Project Preview'; // This alt is for the <meta property="og:image:alt">, not the <img> inside
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }) {
    const slug = params.slug;

    try {
        const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store', // Good for ensuring fresh data for the image
        });

        if (!res.ok) {
            console.error(`OG Image: API fetch failed for ${slug} with status ${res.status}`);
            throw new Error(`Failed to fetch project data (status: ${res.status})`);
        }

        const post = await res.json();
        const project = post?.data;

        // Robustly get the image URL
        const imageUrl = project?.imageGallery?.[0]?.secure_url;

        if (!project) {
            console.error(`OG Image: No project data found for slug ${slug} after successful fetch.`);
            throw new Error('Project data is missing or malformed.');
        }

        return new ImageResponse(
            (
                <div // Outer container
                    style={{
                        background: 'linear-gradient(to right, #1f2937, #111827)',  
                        color: 'white',  
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',  
                        textAlign: 'center',
                    }}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={project?.title || 'Project Image Preview'}  
                            style={{
                                width: 'auto',     
                                height: 'auto',  
                                maxWidth: '100%',  
                                maxHeight: '100%', 
                                objectFit: 'contain', 
                           
                            }}
                        />
                    ) : (
                         <div style={{ fontSize: 48, fontWeight: 'bold' }}>
                            {project?.title || 'Project Preview (No Image)'}
                        </div>
                    )}
                </div>
            ),
            {
                ...size,
                // You can embed fonts if you use custom fonts for fallback text
                // fonts: [
                //   {
                //     name: 'Inter',
                //     data: await interRegularFontData, // You'd need to fetch/load font data
                //     style: 'normal',
                //     weight: 400,
                //   },
                // ],
            }
        );
    } catch (error) {
        console.error(`Error generating OG image for slug ${slug}:`, error.message);

        // Fallback error image
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: '#f8d7da', // Light red background for error
                        color: '#721c24',     // Dark red text for error
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        textAlign: 'center',
                    }}
                >
                    Project Image Not Available
                </div>
            ),
            { ...size }
        );
    }
}