import { ImageResponse } from 'next/og';

export const alt = 'Project Preview';
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
            cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch project');
        const post = await res.json();
        const project = post?.data;

        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #1f2937, #111827)',
                        color: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        textAlign: 'center',
                    }}
                >
                    {project?.title || 'Project Preview'}
                </div>
            ),
            { ...size }
        );
    } catch (error) {
        console.error('Error generating OG image:', error);

        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: '#f8d7da',
                        color: '#721c24',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Project Not Found
                </div>
            ),
            { ...size }
        );
    }
}
