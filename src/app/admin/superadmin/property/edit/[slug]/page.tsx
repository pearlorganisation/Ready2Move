import EditProPertyComp from "@/components/EditPropertyComp";

export default async function EditProperty({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <div>
      <EditProPertyComp slug={slug} />
    </div>
  );
}
