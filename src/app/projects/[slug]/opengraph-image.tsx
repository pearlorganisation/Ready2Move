import { ImageResponse } from 'next/og'

export const alt = 'Project Preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug

  try {
    const res = await fetch(`https://api.ready2move.co.in/api/v1/projects/${slug}`, {
      // cache: 'no-store', // optional, to prevent caching
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch project')
    }

    const post = await res.json()

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          {post?.title || 'Untitled Project'}
        </div>
      ),
      size
    )
  } catch (error) {
    // fallback image
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
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
      size
    )
  }
}
