import { ImageResponse } from 'next/og'
import { axiosInstance } from '@/lib/constants/axiosInstance'

// Metadata for OG image
export const alt = 'Project Preview'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// OG Image generation function
export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug

  // Fetch project data
  const { data: post } = await axiosInstance.get(`/api/v1/projects/${slug}`)

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
}
