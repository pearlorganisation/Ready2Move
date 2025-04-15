import MySlugProperty from "@/components/MySlugProperty";

// interface Props {
//   params: { slug: string };
// }

export default async function ProjectDetails(params:{
  params:Promise<{slug:string}>
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-20">
      <MySlugProperty slug={slug} />
    </div>
  );
}
