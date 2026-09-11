"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowDown } from "lucide-react";

export default function IdentitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frame1Ref = useRef<HTMLDivElement>(null);
  const frame2Ref = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const hookRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Background PORTFOLIO subtle parallax scroll within Frame 1
      if (bgWordRef.current && frame1Ref.current) {
        gsap.fromTo(
          bgWordRef.current,
          {
            yPercent: -15,
            scale: 0.95,
            opacity: 0.25,
          },
          {
            yPercent: 15,
            scale: 1.05,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: frame1Ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 2. Foreground Name entrance
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: frame1Ref.current,
              start: "top 70%",
            },
          }
        );
      }

      // 3. Hook entrance
      if (hookRef.current) {
        gsap.fromTo(
          hookRef.current,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: frame1Ref.current,
              start: "top 65%",
            },
          }
        );
      }

      // 4. Frame 2: Two-column summary & creed quote entrance
      if (summaryRef.current && frame2Ref.current) {
        gsap.fromTo(
          summaryRef.current,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: frame2Ref.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative w-full bg-cream overflow-hidden select-none border-b border-dustyRose/25"
    >
      {/* Editorial Decorative Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C96F82_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* ========================================================================= */}
      {/* FRAME 1 (100vh): NAME & HOOK ONLY (FIRST SCREEN VIEW)                     */}
      {/* ========================================================================= */}
      <div
        ref={frame1Ref}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 sm:py-24 overflow-hidden"
      >
        {/* Corner Scrapbook Stamps */}
        <div className="absolute top-10 left-8 sm:left-14 flex items-center space-x-2 text-xs font-mono text-dustyRose uppercase tracking-widest z-10">
          <span className="w-2 h-2 rounded-full bg-burgundy" />
          <span>SEC. 02 &bull; IDENTITY</span>
        </div>

        <div className="absolute top-10 right-8 sm:right-14 hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve z-10">
          <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
          <span>ARCHIVE REF: KP-2026</span>
        </div>

        {/* LAYER 1 (BACK): GIANT ORIGINAL "PORTFOLIO" */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden -translate-y-[59px] translate-x-[5px]">
          <div
            ref={bgWordRef}
            aria-hidden="true"
            className="flex items-center justify-center"
          >
            <span
              className="text-[18vw] sm:text-[16vw] font-serif font-black uppercase tracking-[0.18em] text-[#C96F82]/30 select-none whitespace-nowrap blur-[3px] sm:blur-[5px] scale-110 transform will-change-transform"
              style={{
                textShadow: "0 0 40px rgba(201, 111, 130, 0.25)",
                WebkitTextStroke: "1px rgba(101, 31, 53, 0.2)",
                transform: "translateZ(0)",
              }}
            >
              PORTFOLIO
            </span>
          </div>
        </div>

        {/* LAYER 2 (FOREGROUND): CRISP & PROMINENT "KRITIKA" + HOOK */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto -translate-y-[14px]">
          {/* Editorial Top Accent Ribbon */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blush border border-dustyRose/40 text-burgundy text-xs font-mono mb-4 sm:mb-6 shadow-sm">
            <span className="font-semibold tracking-wider uppercase">
              ENGINEER IN THE MAKING &bull; CLASS OF 2028
            </span>
          </div>

          {/* The Dominant Foreground Name */}
          <h1
            ref={nameRef}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-serif font-bold text-burgundy tracking-tight leading-none drop-shadow-sm select-text"
          >
            KRITIKA
          </h1>

          {/* Headline Hook */}
          <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
            <p
              ref={hookRef}
              className="text-lg sm:text-2xl md:text-3xl font-serif italic text-burgundy font-medium leading-snug"
            >
              &ldquo;I’m someone who loves to learn, dreams big, works hard, and is never quite satisfied with ordinary.&rdquo;
            </p>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center space-y-1 text-dustyRose">
          <ArrowDown className="w-4 h-4 animate-bounce text-burgundy" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FRAME 2 (100vh): TWO-COLUMN SUMMARY & CONCLUSION                          */}
      {/* ========================================================================= */}
      <div
        ref={frame2Ref}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-20 sm:py-24 z-10"
      >
        <div
          ref={summaryRef}
          className="w-full max-w-4xl mx-auto flex flex-col items-center my-auto space-y-10 sm:space-y-12"
        >
          {/* Two-Column Summary Spread */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center text-left w-full p-8 sm:p-12 rounded-2xl bg-[#FFFDF9]/70 border border-dustyRose/25 shadow-sm backdrop-blur-xs">
            {/* Left Column: Background & Areas Explored */}
            <p className="text-sm sm:text-base md:text-lg text-espresso/85 font-sans leading-relaxed">
              I’m a Computer Science Engineering student who enjoys turning ideas into practical solutions. Through projects and hands-on experiences, I’ve explored areas ranging from web and mobile development to backend systems, databases, and emerging technologies.
            </p>

            {/* Right Column: Philosophy & Mindset */}
            <p className="text-sm sm:text-base md:text-lg text-espresso/85 font-sans leading-relaxed md:border-l md:border-dustyRose/30 md:pl-10">
              I’m particularly drawn to understanding how things work behind the scenes, while always looking for opportunities to learn, build, and take on something new.
            </p>
          </div>

          {/* Faint Artistic Rotated Quote (Centered Below Both Columns) */}
          <div className="pt-2 select-none text-center">
            <p className="font-serif italic text-2xl sm:text-3xl md:text-5xl text-burgundy/40 tracking-tight -rotate-1 transform inline-block drop-shadow-xs select-text">
              &ldquo;The harder I work, the luckier I get.&rdquo;
            </p>
          </div>
        </div>

        {/* Bottom Scroll Cue to Envelope Gallery */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center space-y-1 text-dustyRose">
          <span className="text-[11px] font-mono tracking-widest uppercase">
            Envelope Gallery Next
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-burgundy" />
        </div>
      </div>
    </section>
  );
}
