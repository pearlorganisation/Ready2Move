import EditProjectComp from "@/components/UpdateProjectcomp";

export default async function EditProject({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <div>
      <EditProjectComp slug={slug} />
    </div>
  );
}
