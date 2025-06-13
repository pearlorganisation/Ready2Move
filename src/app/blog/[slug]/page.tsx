import BlogDetails from "@/components/BlogDetails";

export default async function ProjectDetails(params: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-2">
      <BlogDetails slug={slug} />
    </div>
  );
}
