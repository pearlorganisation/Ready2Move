"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const teamMembers = [
  {
    id: 1,
    name: "Shubham Mamgain",
    role: "Frontend Developer",
    bio: "Shubham is a passionate frontend developer with a knack for creating seamless user experiences and beautiful interfaces.",

    image:
      "https://wallpapers-clan.com/wp-content/uploads/2024/04/sukuna-red-jujutsu-kaisen-desktop-wallpaper-preview.jpg",
  },
  {
    id: 2,
    name: "Manish Gupta",
    role: "Backend Developer",
    bio: "Manish is a backend wizard, crafting robust APIs and ensuring our applications run smoothly behind the scenes.",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2aGi0tYThTorsp2xH8Eby1XcnbczJWbS2kw&s",
  },
  {
    id: 3,
    name: "Nayan Kunwar",
    role: "Lead Backend Developer",
    bio: "Nayan leads our backend team, architecting scalable solutions and ensuring data integrity across all our platforms.",

    image:
      "https://i.pinimg.com/736x/3a/37/50/3a37503f0ced98a450811d3b6cd6ad57.jpg",
  },
  {
    id: 4,
    name: "Anjali Bartwal",
    role: "Admin Developer",
    bio: "Anjali is our admin developer, ensuring that our internal systems are efficient and user-friendly for our team.",

    image: "https://images.alphacoders.com/122/1229687.jpg",
  },
];

export default function AboutTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );

      // Auto-rotate through team members
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
      }, 5000);

      return () => {
        tl.kill();
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2
            ref={headingRef}
            className="mb-6 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl"
          >
            Meet The Team
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Our diverse team of experts brings together a wealth of experience
            and passion to create exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-8 flex space-x-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === activeIndex ? "w-12 bg-white" : "w-6 bg-white/30"
                  }`}
                  aria-label={`View team member ${index + 1}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h3 className="mb-1 text-3xl font-bold">
                  {teamMembers[activeIndex].name}
                </h3>
                <p className="mb-4 text-lg text-gray-400">
                  {teamMembers[activeIndex].role}
                </p>
                <p className="text-gray-300">{teamMembers[activeIndex].bio}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[500px]">
            <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 gap-4 opacity-30">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="overflow-hidden rounded-lg">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              ))}
            </div>

            <AnimatePresence>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className="relative h-[400px] w-[300px] overflow-hidden rounded-lg">
                  <img
                    src={teamMembers[activeIndex].image || "/placeholder.svg"}
                    alt={teamMembers[activeIndex].name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
