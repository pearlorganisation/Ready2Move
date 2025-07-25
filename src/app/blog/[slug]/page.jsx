import BlogDetails from "@/components/BlogDetails";

export default async function ProjectDetails({ params }) {
  const slug  = params.slug;

  const res = await fetch(
    `https://api.ready2move.co.in/api/v1/blogs/${params?.slug}`
  );
  const blogData = await res.json()
  console.log("the blog data is", blogData)
  return (
    <div className="mt-2">
      <BlogDetails slug={slug} />
    </div>
  );
}
