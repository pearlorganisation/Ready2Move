import MySlugProperty from "@/components/MySlugProperty";

interface Props {
  params: { slug: string };
}

export default function PropertyDetails({ params }: Props) {
  const slug = params.slug;

  return (
    <div className="mt-20">
      <MySlugProperty slug={slug} />
    </div>
  );
}
