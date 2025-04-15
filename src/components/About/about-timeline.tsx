"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const timelineEvents = [
  {
    year: "2015",
    title: "Founded",
    description:
      "Our journey began with a small team of three passionate designers and developers.",
  },
  {
    year: "2017",
    title: "First Major Client",
    description:
      "Secured our first enterprise client and expanded our team to 10 members.",
  },
  {
    year: "2019",
    title: "International Expansion",
    description:
      "Opened our second office in London and began serving clients globally.",
  },
  {
    year: "2021",
    title: "Award Recognition",
    description:
      "Received multiple industry awards for our innovative digital experiences.",
  },
  {
    year: "2023",
    title: "Today",
    description:
      "A team of 50+ creatives working with leading brands across various industries.",
  },
];

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      timelineEvents.forEach((_, index) => {
        const eventEl = document.querySelector(`.timeline-event-${index}`);

        gsap.fromTo(
          eventEl,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: eventEl,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-gray-400"
          >
            From humble beginnings to industry recognition, our story is one of
            passion, perseverance, and continuous growth.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            ref={timelineRef}
            className="absolute left-[50px] top-0 bottom-0 w-px bg-white/10 sm:left-1/2"
          >
            <motion.div
              className="h-full w-full bg-gradient-to-b from-purple-500 to-blue-500"
              style={{ scaleY: lineProgress, transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-event-${index} relative grid grid-cols-1 gap-6 sm:grid-cols-2`}
              >
                <div
                  className={`flex ${
                    index % 2 === 0 ? "sm:justify-end" : "sm:order-2"
                  }`}
                >
                  <div className="max-w-xs">
                    <div className="mb-2 text-sm font-light uppercase tracking-widest text-gray-400">
                      {event.year}
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>

                <div
                  className={`relative ${index % 2 === 0 ? "sm:order-2" : ""}`}
                >
                  <div className="absolute left-0 top-0 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-white bg-black sm:left-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
