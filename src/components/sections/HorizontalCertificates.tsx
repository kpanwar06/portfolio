"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scroll, Sparkles, Calendar, Tag, ChevronRight, Bookmark } from "lucide-react";

interface WorkshopItem {
  id: number;
  type: "Workshop" | "Participation" | "Course" | "Hackathon";
  title: string;
  organization: string;
  year: string;
  badge: string;
  skills: string[];
  description: string;
}

export default function HorizontalCertificates() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const workshops: WorkshopItem[] = [
    {
      id: 1,
      type: "Course",
      title: "Django Backend & REST APIs",
      organization: "Coursera & Meta",
      year: "2025",
      badge: "Completed",
      skills: ["Django", "Python", "ORM", "REST"],
      description: "Deep dive into model relationships, serializers, class-based views, and secure token authentication.",
    },
    {
      id: 2,
      type: "Workshop",
      title: "Git Documentation & Collaboration Syntax",
      organization: "Open Source Initiative",
      year: "2024",
      badge: "Certificate",
      skills: ["Git", "GitHub Actions", "Markdown", "CI/CD"],
      description: "Hands-on workshop on repository architecture, branching strategies, and release documentation.",
    },
    {
      id: 3,
      type: "Hackathon",
      title: "InnovateTech 36-Hour Hackathon",
      organization: "BMSCE Tech Club",
      year: "2025",
      badge: "Finalist",
      skills: ["Rapid Prototyping", "Full Stack", "System Design"],
      description: "Engineered an interactive real-time student utility application with high-concurrency event handling.",
    },
    {
      id: 4,
      type: "Workshop",
      title: "Distributed Data Pipelines with Kafka",
      organization: "Cloud & Data Summit",
      year: "2025",
      badge: "Participant",
      skills: ["Apache Kafka", "Message Queues", "Streaming"],
      description: "Explored publish-subscribe topologies, consumer groups, partitions, and fault-tolerant event sourcing.",
    },
    {
      id: 5,
      type: "Course",
      title: "Relational Database Design & SQL Performance",
      organization: "Engineering Academy",
      year: "2024",
      badge: "Distinction",
      skills: ["PostgreSQL", "Query Optimization", "Indexing"],
      description: "Mastered indexing strategies, query execution plans, normalization, and ACID transaction safety.",
    },
    {
      id: 6,
      type: "Workshop",
      title: "Modern UI Engineering & Responsive Web",
      organization: "Frontend Guild",
      year: "2025",
      badge: "Certificate",
      skills: ["Tailwind CSS", "TypeScript", "Micro-animations"],
      description: "Creating accessible, performant user interfaces with design tokens and responsive CSS typography.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth + 300}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="workshops"
      className="relative w-full h-screen bg-cream overflow-hidden flex flex-col justify-center border-b border-blush select-none"
    >
      {/* Background Scrapbook Watermark */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[14vw] font-serif font-black text-blush/40 pointer-events-none select-none tracking-widest whitespace-nowrap">
        WORKSHOPS &amp; CREDENTIALS
      </div>

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 mb-8 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-burgundy">
            <Scroll className="w-4 h-4 text-dustyRose" />
            <span>SEC. 05 &bull; WORKSHOPS &amp; COURSES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-espresso font-bold mt-1">
            Continuous Learning Reel
          </h2>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-mauve-dark mt-3 sm:mt-0 bg-blush/60 px-3 py-1.5 rounded-full border border-dustyRose/30">
          <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
          <span>Scroll down to slide horizontally &rarr;</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HORIZONTAL CAROUSEL TRACK                                                 */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-visible z-10">
        <div
          ref={trackRef}
          className="flex items-center space-x-6 sm:space-x-8 px-6 sm:px-12 w-max"
        >
          {workshops.map((item, index) => (
            <div
              key={item.id}
              className="w-[300px] sm:w-[380px] h-[400px] sm:h-[440px] flex-shrink-0 bg-[#FFFDF9] rounded-2xl shadow-editorial p-6 sm:p-7 border-2 border-blush hover:border-dustyRose/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative group"
            >
              {/* Decorative Corner Tape Stamp */}
              <div className="absolute -top-3 right-8 w-16 h-6 bg-blush/90 border border-dustyRose/40 rounded-xs shadow-xs transform rotate-3 flex items-center justify-center text-[9px] font-mono uppercase text-burgundy font-bold">
                {item.type}
              </div>

              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-mauve pb-3 border-b border-blush">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-dustyRose" />
                    <span>{item.year}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blush text-burgundy font-bold text-[10px] uppercase">
                    {item.badge}
                  </span>
                </div>

                <span className="text-xs font-mono text-dustyRose uppercase tracking-wider block mt-4">
                  {item.organization}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-espresso font-bold mt-1 leading-snug group-hover:text-burgundy transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-espresso/75 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Bottom: Skills & Number */}
              <div className="pt-4 border-t border-blush">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream border border-blush text-mauve-dark font-medium"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-mauve">
                  <span className="flex items-center space-x-1 text-dustyRose">
                    <Bookmark className="w-3 h-3" />
                    <span>Archive Entry 0{index + 1}</span>
                  </span>
                  <span className="text-burgundy font-bold">Verified</span>
                </div>
              </div>
            </div>
          ))}

          {/* End-of-Track Scrapbook Card */}
          <div className="w-[280px] sm:w-[320px] h-[400px] sm:h-[440px] flex-shrink-0 bg-burgundy text-cream rounded-2xl shadow-editorial p-8 flex flex-col justify-between border-2 border-blush/30 relative">
            <div className="space-y-3">
              <span className="text-xs font-mono text-dustyRose-light uppercase tracking-widest block">
                Next Chapter
              </span>
              <h3 className="text-3xl font-serif font-bold text-[#FFF8F0]">
                Always Learning &amp; Exploring.
              </h3>
              <p className="text-xs font-sans text-blush/80 leading-relaxed pt-2">
                Every workshop and challenge expands the developer toolkit. Next up: Personal Journey Path!
              </p>
            </div>

            <div className="pt-4 border-t border-blush/20 flex items-center justify-between text-xs font-mono text-dustyRose-light">
              <span>Scroll down to continue</span>
              <ChevronRight className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
