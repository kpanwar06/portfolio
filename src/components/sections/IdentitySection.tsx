"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowDown } from "lucide-react";

export default function IdentitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax scroll effect:
      // Background PORTFOLIO drifts gently with subtle blur behind KRITIKA
      gsap.fromTo(
        bgWordRef.current,
        {
          yPercent: -8,
          scale: 0.98,
          opacity: 0.2,
        },
        {
          yPercent: 8,
          scale: 1.02,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Foreground Name entrance
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
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Subtitle & meta entrance
      gsap.fromTo(
        metaRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-cream overflow-hidden px-4 sm:px-8 py-8 sm:py-10 select-none border-b border-dustyRose/25"
    >
      {/* Editorial Decorative Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C96F82_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Top Header Row */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-between items-center text-xs font-mono text-dustyRose uppercase tracking-widest pt-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-burgundy" />
          <span>SEC. 02 &bull; IDENTITY</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve">
          <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
          <span>ARCHIVE REF: KP-2026</span>
        </div>
      </div>

      {/* Center Main Stage */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto py-2 text-center">
        {/* Editorial Top Accent Ribbon */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blush border border-dustyRose/40 text-burgundy text-xs font-mono mb-3 sm:mb-4 shadow-sm">
          <span className="font-semibold tracking-wider uppercase">
            ENGINEER IN THE MAKING &bull; CLASS OF 2028
          </span>
        </div>

        {/* ========================================================================= */}
        {/* NAME CLUSTER: Perfectly Centered "PORTFOLIO" Behind "KRITIKA" */}
        {/* ========================================================================= */}
        <div className="relative flex items-center justify-center mb-4 sm:mb-5">
          {/* Background PORTFOLIO: centered directly behind KRITIKA */}
          <div
            ref={bgWordRef}
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible"
          >
            <span
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-serif font-bold uppercase tracking-[0.06em] sm:tracking-[0.1em] text-[#C96F82]/22 select-none whitespace-nowrap blur-[1.5px] sm:blur-[2.5px] transform will-change-transform"
              style={{
                transform: "translateZ(0)",
              }}
            >
              PORTFOLIO
            </span>
          </div>

          {/* Crisp Foreground Name */}
          <h1
            ref={nameRef}
            className="relative z-10 text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-serif font-bold text-burgundy tracking-tight leading-none drop-shadow-sm select-text"
          >
            KRITIKA
          </h1>
        </div>

        {/* Metadata & Editorial Subtitle */}
        <div ref={metaRef} className="space-y-4 max-w-3xl mx-auto">
          {/* Headline Hook (Seen First) */}
          <p className="text-base sm:text-lg md:text-xl font-serif italic text-burgundy font-medium leading-snug max-w-2xl mx-auto pt-1">
            &ldquo;I’m someone who loves to learn, dreams big, works hard, and is never quite satisfied with ordinary.&rdquo;
          </p>

          {/* DUAL-COLUMN SUMMARY SPLIT (Left Half & Right Half) */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start text-left pt-3 pb-2 border-t border-b border-dustyRose/20 my-3">
            {/* Left Half: Background & Areas Explored */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-dustyRose-dark uppercase tracking-wider font-semibold">
                <span>✦</span>
                <span>Focus &amp; Craft</span>
              </div>
              <p className="text-xs sm:text-sm text-espresso/80 font-sans leading-relaxed">
                I’m a Computer Science Engineering student who enjoys turning ideas into practical solutions. Through projects and hands-on experiences, I’ve explored areas ranging from web and mobile development to backend systems, databases, and emerging technologies.
              </p>
            </div>

            {/* Right Half: Philosophy & Mindset */}
            <div className="space-y-1.5 md:border-l md:border-dustyRose/25 md:pl-6">
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-dustyRose-dark uppercase tracking-wider font-semibold">
                <span>✦</span>
                <span>Philosophy &amp; Drive</span>
              </div>
              <p className="text-xs sm:text-sm text-espresso/80 font-sans leading-relaxed">
                I’m particularly drawn to understanding how things work behind the scenes, while always looking for opportunities to learn, build, and take on something new.
              </p>
            </div>
          </div>

          {/* Faint Artistic Rotated Quote (Centered Below Both Columns) */}
          <div className="pt-2 select-none">
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-burgundy/45 tracking-tight -rotate-1 transform inline-block drop-shadow-xs select-text">
              &ldquo;The harder I work, the luckier I get.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center space-y-1 text-dustyRose pb-1">
        <span className="text-[11px] font-mono tracking-widest uppercase">
          Envelope Gallery Next
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-burgundy" />
      </div>
    </section>
  );
}
