"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom component for animated text
const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className: string;
}) => {
  // Animation variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  // Animation variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const words = text.split(" ");

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-1 inline-block" variants={child}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(
        sectionRef.current,
        {
          backgroundPosition: "50% 100%",
          ease: "none",
        },
        0
      );

      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 bg-[50%_0%] p-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(0,0,0,0)_70%)]" />
        <div className="grid h-full w-full grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-20">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-sm font-light uppercase tracking-widest text-gray-400"
        >
          About Us
        </motion.div>

        <AnimatedText
          text="We Create Real Estate Experiences That Matter"
          className="mb-8 text-5xl font-bold leading-tight tracking-tighter sm:text-6xl md:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-xl text-gray-300"
        >
          Ready 2 Move was founded with a vision to simplify property buying,
          selling, and renting for everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#mission"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black px-8 py-4 font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            <span className="relative z-10">Discover Our Story</span>
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-0 right-0 flex justify-center"
      >
        <div className="flex animate-bounce flex-col items-center">
          <div className="mb-2 h-10 w-[1px] bg-gradient-to-b from-transparent to-white/50" />
          <div className="h-3 w-3 rotate-45 border-b border-r border-white/50" />
        </div>
      </motion.div>
    </section>
  );
}
