import FAQ from "./FAQ/page";
import HeroSection from "./home/herosection";
import PropertyCard from "./home/PropertyCard";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <HeroSection />

        <FAQ />
      </div>
    </>
  );
}
