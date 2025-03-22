
import FAQ from "./FAQ/page";
import HeroSection from "./home/herosection";

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
