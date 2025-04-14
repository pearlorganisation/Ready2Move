import AboutContact from "@/components/About/about-contact";
import AboutCursor from "@/components/About/about-cursor";
import AboutHero from "@/components/About/about-hero";
import AboutMission from "@/components/About/about-mission";
import AboutTeam from "@/components/About/about-team";
import AboutTimeline from "@/components/About/about-timeline";
import React from "react";

const page = () => {
  return (
    <main className="relative overflow-hidden bg-blue-400 text-white">
      <AboutCursor />
      <AboutHero />
      <AboutMission />
      <AboutTeam />
      <AboutTimeline />
      <AboutContact />
    </main>
  );
};

export default page;
