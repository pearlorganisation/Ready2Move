
import MySlugComp from "@/components/MySlugComp";
// interface PageProps {
//   params: { slug: string };
// }
// export default async function PostPage(params: { 
//  params: Promise<{ slug: string }>;) {
//   const slug = await(params).slug;
//   return <Block slug={slug}/>
// }
 

export default async function ProjectDetails(params:{
  params:Promise<{slug: string}>
}) {
  const { slug } = await params.params;

  return (
    <div className="mt-20">
      <MySlugComp slug={slug} />
      
    </div>
  );
}

