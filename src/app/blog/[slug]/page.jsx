import BlogDetails from "@/components/BlogDetails";

export async function generateMetadata({params}) {
  const res = await fetch(
    // api.ready2move.co.in
    `https://api.ready2move.co.in/api/v1/blogs/${params?.slug}`
  );
  const blogData = await res.json()
 
  const data = blogData?.data
  const title = data?.title
  const pageUrl = `https://ready2move.co.in/blog/${params.slug}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`
   return{
    title,
    openGraph:{
        title,
        description:title,
        type:"website",
        locale:"en_US",
        url:pageUrl,
        images:[
          {
            url:ogImageUrl,
            width:1200,
            height:630,
            alt:title
          },
        ]
    },
    twitter:{
      card:"summary_large_image",
      title,
      description:title,
      images:[ogImageUrl]
    }
  }
}

export default async function ProjectDetails({ params }) {
  const slug = params.slug;
  return (
    <div className="mt-2">
      <BlogDetails slug={slug} />
    </div>
  );
}
