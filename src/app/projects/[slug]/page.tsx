import MySlugComp from "@/components/MySlugComp";

export default async function ProjectDetails(params: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-20">
      <MySlugComp slug={slug} />
    </div>
  );
}
