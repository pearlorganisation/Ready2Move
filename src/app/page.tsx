import FAQ from "./FAQ/page";
import FeaturedProjects from "./home/FeaturedProjects";
import HeroSection from "./home/herosection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <HeroSection />

        <FeaturedProjects />

        <FAQ />
      </div>
    </>
  );
}
