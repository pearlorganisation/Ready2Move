import { ImageResponse } from "next/og";

export const alt = "Project Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
  const slug = params.slug;
  console.log(`[OG IMAGE GEN SIMPLIFIED 1] Starting for slug: ${slug}`);

  try {
    const res = await fetch(
      `https://api.ready2move.co.in/api/v1/properties/${slug}`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    console.log(
      `[OG IMAGE GEN SIMPLIFIED 1] API status for ${slug}: ${res.status}`
    );

    if (!res.ok) {
      console.error(
        `[OG IMAGE GEN SIMPLIFIED 1] API fetch failed for ${slug}: ${res.status}`
      );
      throw new Error(`API failed (status: ${res.status})`);
    }

    const post = await res.json();
    const project = post?.data;

    if (!project) {
      console.error(
        `[OG IMAGE GEN SIMPLIFIED 1] No project data (post.data) for ${slug}.`
      );
      throw new Error("Project data missing.");
    }
    console.log(
      `[OG IMAGE GEN SIMPLIFIED 1] Project data for ${slug}:`,
      JSON.stringify(project, null, 2)
    );

    const imageUrl = project?.imageGallery?.[0]?.secure_url;
    console.log(
      `[OG IMAGE GEN SIMPLIFIED 1] Extracted imageUrl for ${slug}: ${imageUrl}`
    );

    if (!imageUrl) {
      console.error(
        `[OG IMAGE GEN SIMPLIFIED 1] imageUrl is MISSING for ${slug}! Will show text fallback.`
      );
      return new ImageResponse(
        (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "blue",
              color: "white",
              fontSize: 30,
            }}
          >
            Image URL not found for {project?.title || "project"}.
          </div>
        ),
        { ...size }
      );
    }

    console.log(
      `[OG IMAGE GEN SIMPLIFIED 1] Attempting to render image with src: ${imageUrl}`
    );
    return new ImageResponse(
      (
        <div
          style={{
            // This div is crucial for Satori to have a root layout element
            width: "100%",
            height: "100%",
            display: "flex", // Use flex to control image
            justifyContent: "center",
            alignItems: "center",
            background: "lightgray", // So we can see the canvas
          }}
        >
          <img
            src={imageUrl}
            alt="Project" // Simple alt
            // Satori/ImageResponse often requires explicit width/height on the img tag itself
            // especially if the parent isn't using Tailwind or more complex flex setups.
            width={size.width - 40} // Example: fill most of the canvas with some padding
            height={size.height - 40}
            style={{
              objectFit: "contain", // Important
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
    console.error(
      `[OG IMAGE GEN SIMPLIFIED 1] CATCH BLOCK for ${slug}:`,
      error.message,
      error.stack
    );
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "red",
            color: "white",
            fontSize: 30,
            padding: 20,
            textAlign: "center",
          }}
        >
          ERROR generating image for {slug}: {error.message}
        </div>
      ),
      { ...size }
    );
  }
}
