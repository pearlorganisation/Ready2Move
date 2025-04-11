import MySlugComp from "@/components/MySlugComp";

// app/projects/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export default async function ProjectDetails({ params }: Props) {
  const slug = params.slug;

  return (
    <div className="mt-20">
      <MySlugComp slug={slug} />
    </div>
  );
}
