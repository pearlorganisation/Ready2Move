import EditProPertyComp from "@/components/EditPropertyComp";

export default async function EditProperty( 
  params: {params: Promise<{ slug: string }>;
}) {
  const { slug } =await params.params;

  return (
    <div>
      <EditProPertyComp slug={slug} />
    </div>
  );
}



