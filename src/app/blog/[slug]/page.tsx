import BlogDetails from "@/components/BlogDetails";

export default async function ProjectDetails(params:{
    params:Promise<{slug: string}>
  }) {
    const { slug } = await params.params;
  
    return (
      <div className="mt-20">
        <BlogDetails slug={slug} />
        
      </div>
    );
  }