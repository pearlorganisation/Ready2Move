import EditProjectComp from "@/components/UpdateProjectcomp";

export default async function EditProject(
  params:{params:Promise<{slug: string}>}) {
  const { slug } = await params.params;

  return (
    <div>
      <EditProjectComp slug={slug} />
    </div>
  );
}
