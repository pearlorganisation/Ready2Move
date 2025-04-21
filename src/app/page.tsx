import FAQ from "./FAQ/page";
import FeaturedProjects from "./home/FeaturedProjects";
import FeaturedProperties from "./home/FeaturedProperties";
import HeroSection from "./home/herosection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <HeroSection />

        <FeaturedProjects />

        <FeaturedProperties />

        <FAQ />
      </div>
    </>
  );
}
