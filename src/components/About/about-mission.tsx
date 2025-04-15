"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }
      );

      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            ref={textRef}
            style={{ opacity, y }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl">
              Our Mission & Values
            </h2>

            <div className="space-y-8">
              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-3 inline-block h-px w-12 bg-white/50 transition-all duration-300 group-hover:w-24 group-hover:bg-white"></span>
                  <h3 className="text-xl font-semibold">Innovation</h3>
                </div>
                <p className="text-gray-400">
                  We at Ready2Move push boundaries and challenge conventions to
                  create forward-thinking solutions that set new standards in
                  digital design.
                </p>
              </div>

              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-3 inline-block h-px w-12 bg-white/50 transition-all duration-300 group-hover:w-24 group-hover:bg-white"></span>
                  <h3 className="text-xl font-semibold">Collaboration</h3>
                </div>
                <p className="text-gray-400">
                  We believe in the power of teamwork, bringing together diverse
                  perspectives to create holistic and impactful experiences.
                </p>
              </div>

              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-3 inline-block h-px w-12 bg-white/50 transition-all duration-300 group-hover:w-24 group-hover:bg-white"></span>
                  <h3 className="text-xl font-semibold">Excellence</h3>
                </div>
                <p className="text-gray-400">
                  We're committed to delivering exceptional quality in
                  everything we do, from concept to execution and beyond.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <a
                href="#team"
                className="group inline-flex items-center text-sm font-medium text-white"
              >
                <span className="mr-2">Meet Our Team</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center">
            <div
              ref={imageRef}
              className="relative z-10 h-[500px] w-full overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 mix-blend-overlay" />
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2024/02/bleach-ichigo-kurosaki-blue-desktop-wallpaper-cover.jpg"
                alt="Our workspace"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 h-[500px] w-full rounded-lg border border-white/10 bg-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
