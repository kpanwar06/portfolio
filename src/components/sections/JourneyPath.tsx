"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Dribbble, Palette, Code2, BookOpen, Music, Cloud, Compass } from "lucide-react";

interface StoneItem {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  stoneColor: string;
  textColor: string;
  pos: {
    // Relative placement along the ~45° diagonal
    left: string;
    bottom: string;
  };
  shape: string;
}

export default function JourneyPath() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathSvgRef = useRef<SVGPathElement>(null);
  const stonesContainerRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [activeStone, setActiveStone] = useState<number | null>(null);

  const stones: StoneItem[] = [
    {
      id: 1,
      title: "Basketball",
      category: "Athletics & Energy",
      icon: <Dribbble className="w-6 h-6 text-[#d8a47f]" />,
      description: "Quick reflexes, fast breaks, team coordination, and court chemistry.",
      stoneColor: "bg-[#38262a] border-dustyRose/40",
      textColor: "text-cream",
      pos: { left: "10%", bottom: "8%" },
      shape: "rounded-[45%_55%_60%_40%/50%_40%_60%_50%]",
    },
    {
      id: 2,
      title: "Drawing & Sketching",
      category: "Visual Arts",
      icon: <Palette className="w-6 h-6 text-dustyRose-light" />,
      description: "Charcoal sketches, editorial illustration, color studies, and scrapbook design.",
      stoneColor: "bg-[#4a1c28] border-blush/40",
      textColor: "text-cream",
      pos: { left: "28%", bottom: "26%" },
      shape: "rounded-[55%_45%_50%_50%/40%_60%_40%_60%]",
    },
    {
      id: 3,
      title: "Problem Solving",
      category: "Algorithms & Logic",
      icon: <Code2 className="w-6 h-6 text-blush" />,
      description: "Translating ambiguous challenges into elegant, clean, and robust code architectures.",
      stoneColor: "bg-[#291b1e] border-dustyRose",
      textColor: "text-cream",
      pos: { left: "48%", bottom: "46%" },
      shape: "rounded-[50%_50%_40%_60%/60%_40%_50%_50%]",
    },
    {
      id: 4,
      title: "Reading & Journaling",
      category: "Reflection & Growth",
      icon: <BookOpen className="w-6 h-6 text-mauve-light" />,
      description: "Deep reading in system design, technology essays, philosophy, and personal journals.",
      stoneColor: "bg-[#522332] border-blush/50",
      textColor: "text-cream",
      pos: { left: "66%", bottom: "66%" },
      shape: "rounded-[60%_40%_55%_45%/45%_55%_45%_55%]",
    },
    {
      id: 5,
      title: "Music & Beats",
      category: "Creative Rhythm",
      icon: <Music className="w-6 h-6 text-dustyRose-light" />,
      description: "Curating chill lo-fi playlists and rhythmic grooves that power late-night building sessions.",
      stoneColor: "bg-[#38262a] border-dustyRose/40",
      textColor: "text-cream",
      pos: { left: "78%", bottom: "82%" },
      shape: "rounded-[48%_52%_58%_42%/52%_48%_52%_48%]",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Draw the SVG line progressively on scroll
      if (pathSvgRef.current) {
        const length = pathSvgRef.current.getTotalLength();
        gsap.set(pathSvgRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathSvgRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // 2. Animate stones popping into view along the diagonal
      const stoneElements = stonesContainerRef.current?.querySelectorAll(".path-stone");
      if (stoneElements && stoneElements.length > 0) {
        gsap.fromTo(
          stoneElements,
          {
            scale: 0,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }

      // 3. Floating Cloud entrance & gentle bobbing
      gsap.fromTo(
        cloudRef.current,
        {
          scale: 0.6,
          opacity: 0,
          y: -30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
          },
        }
      );

      // Cloud gentle floating loop
      gsap.to(cloudRef.current, {
        y: "+=12",
        x: "+=6",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full min-h-[140vh] sm:min-h-[160vh] py-20 px-6 sm:px-12 bg-cream overflow-hidden flex flex-col justify-between border-b border-blush select-none"
    >
      {/* Background Topographic Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(rgba(101,31,53,0.12)_1.5px,transparent_1.5px)] [background-size:28px_28px]" />

      {/* Section Header */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blush border border-dustyRose/40 text-burgundy text-xs font-mono uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5 text-dustyRose" />
          <span>SEC. 06 &bull; PERSONAL JOURNEY MAP</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif text-espresso font-bold">
          The 45&deg; Stepping Stone Trail
        </h2>
        <p className="text-sm sm:text-base font-serif italic text-mauve-dark mt-2 max-w-xl mx-auto">
          Passions, habits, and creative stops that shape my everyday thinking as an engineer.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 45° DIAGONAL MAP CANVAS                                                   */}
      {/* ========================================================================= */}
      <div
        ref={stonesContainerRef}
        className="relative flex-1 w-full max-w-6xl mx-auto my-auto min-h-[750px] sm:min-h-[900px]"
      >
        {/* SVG 45° Diagonal Path Line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          viewBox="0 0 1000 900"
          preserveAspectRatio="none"
        >
          {/* Faint Background Guide Line */}
          <path
            d="M 120 800 Q 300 650 500 480 T 820 180"
            fill="none"
            stroke="#E6B8C0"
            strokeWidth="3"
            strokeDasharray="8 8"
            opacity="0.6"
          />

          {/* Scrubbed Interactive Path */}
          <path
            ref={pathSvgRef}
            d="M 120 800 Q 300 650 500 480 T 820 180"
            fill="none"
            stroke="#651F35"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* ======================================================================= */}
        {/* STONES (DISTRIBUTED ALONG ~45° ASCENT)                                 */}
        {/* ======================================================================= */}
        {stones.map((stone) => (
          <div
            key={stone.id}
            style={{
              left: stone.pos.left,
              bottom: stone.pos.bottom,
            }}
            onClick={() => setActiveStone(activeStone === stone.id ? null : stone.id)}
            className="path-stone absolute -translate-x-1/2 translate-y-1/2 z-20 cursor-pointer group"
          >
            {/* Organic 3D Stone Body */}
            <div
              className={`w-28 sm:w-36 h-24 sm:h-32 ${stone.stoneColor} ${stone.shape} shadow-[-10px_15px_30px_rgba(38,28,30,0.35)] border-4 flex flex-col items-center justify-center p-3 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[-15px_22px_40px_rgba(101,31,53,0.4)] relative`}
            >
              {/* Stone Surface Bevel Highlight */}
              <div className="absolute inset-2 border-t-2 border-l border-white/20 rounded-full pointer-events-none" />

              {/* Stone Symbol / Icon */}
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/10 flex items-center justify-center shadow-inner group-hover:bg-white/20 transition-colors">
                {stone.icon}
              </div>

              {/* Stone Label */}
              <span className={`text-[10px] sm:text-xs font-mono font-bold ${stone.textColor} mt-1.5 tracking-wider uppercase text-center`}>
                {stone.title}
              </span>
            </div>

            {/* Scrapbook Tooltip Tag on Hover or Click */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 sm:w-60 bg-[#FFFDF9] p-3 rounded-xl shadow-editorial-lg border-2 border-dustyRose pointer-events-none transition-all duration-300 z-30 ${
                activeStone === stone.id
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-dustyRose uppercase pb-1 border-b border-blush">
                <span>{stone.category}</span>
                <span>Stop 0{stone.id}</span>
              </div>
              <p className="font-serif italic font-semibold text-espresso text-sm mt-1">
                {stone.title}
              </p>
              <p className="text-[11px] font-sans text-espresso/80 mt-1 leading-snug">
                {stone.description}
              </p>
            </div>
          </div>
        ))}

        {/* ======================================================================= */}
        {/* UPPER/END PORTION: THE CLOUD-LIKE ELEMENT: "MORE TO COME..."           */}
        {/* ======================================================================= */}
        <div
          ref={cloudRef}
          style={{ right: "4%", top: "4%" }}
          className="absolute z-30 cursor-default select-none group"
        >
          {/* Cloud Bubble Structure */}
          <div className="relative flex items-center justify-center p-8 sm:p-12 filter drop-shadow-[0_20px_35px_rgba(101,31,53,0.18)]">
            {/* SVG Editorial Cloud Backdrop */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 260 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50 120 
                   A 35 35 0 0 1 70 50 
                   A 45 45 0 0 1 150 40 
                   A 40 40 0 0 1 210 70 
                   A 35 35 0 0 1 210 130 
                   A 30 30 0 0 1 160 140 
                   L 80 140 
                   A 30 30 0 0 1 50 120 Z"
                fill="#FFF8F0"
                stroke="#C96F82"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
            </svg>

            {/* Content Inside Cloud */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-1 py-2 px-4">
              <div className="flex items-center space-x-1 text-dustyRose">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                  Future Horizons
                </span>
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>

              <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-burgundy tracking-wide">
                &ldquo;More to come&hellip;&rdquo;
              </h3>

              <p className="text-[10px] sm:text-[11px] font-mono text-mauve-dark tracking-wider">
                New chapters &bull; Code &bull; Life
              </p>
            </div>
          </div>
        </div>

        {/* Trail Start Tag at Bottom Left */}
        <div className="absolute left-4 bottom-2 text-xs font-mono text-dustyRose flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-burgundy animate-ping" />
          <span className="uppercase font-bold tracking-widest text-burgundy">
            Start of Journey &bull; Tap any stone
          </span>
        </div>
      </div>
    </section>
  );
}
