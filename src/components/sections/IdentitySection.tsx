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
      // Background PORTFOLIO gently floats behind KRITIKA
      gsap.fromTo(
        bgWordRef.current,
        {
          yPercent: -10,
          scale: 0.98,
          opacity: 0.22,
        },
        {
          yPercent: 10,
          scale: 1.04,
          opacity: 0.4,
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

      // Subtitle & 2-column content entrance
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
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-cream overflow-hidden px-4 sm:px-8 py-8 sm:py-10 select-none"
    >
      {/* Editorial Decorative Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C96F82_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Top Header Row */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-between items-center text-xs font-mono text-dustyRose uppercase tracking-widest pt-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-burgundy" />
          <span>SEC. 02 &bull; IDENTITY</span>
        </div>

        {/* Editorial Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blush border border-dustyRose/40 text-burgundy text-[11px] font-mono shadow-xs">
          <span className="font-semibold tracking-wider uppercase">
            SOFTWARE ENGINEER &bull; CREATIVE BUILDER
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve">
          <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
          <span>ARCHIVE REF: KP-2026</span>
        </div>
      </div>

      {/* Center Main Stage (Fits in one frame) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto py-2 sm:py-4">
        {/* ========================================================================= */}
        {/* NAME CLUSTER: Shifted "PORTFOLIO" Directly Behind "KRITIKA" */}
        {/* ========================================================================= */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8">
          {/* Background PORTFOLIO centered directly on KRITIKA */}
          <div
            ref={bgWordRef}
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          >
            <span
              className="text-[17vw] sm:text-[15vw] md:text-[14vw] font-serif font-black uppercase tracking-[0.18em] text-[#C96F82]/30 select-none whitespace-nowrap blur-[3px] sm:blur-[5px] scale-110 transform will-change-transform -translate-y-1"
              style={{
                textShadow: "0 0 35px rgba(201, 111, 130, 0.25)",
                WebkitTextStroke: "1px rgba(101, 31, 53, 0.15)",
                transform: "translateZ(0)",
              }}
            >
              PORTFOLIO
            </span>
          </div>

          {/* Crisp Dominant Foreground Name */}
          <h1
            ref={nameRef}
            className="relative z-10 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-burgundy tracking-tight leading-none drop-shadow-sm select-text"
          >
            KRITIKA
          </h1>
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN SPLIT: Left (Hook + Faint Quote) | Right (Summary Paragraph) */}
        {/* ========================================================================= */}
        <div
          ref={metaRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-start mt-2 px-2 sm:px-4"
        >
          {/* LEFT COLUMN: Hook + Artistic Rotated Quote (5 cols) */}
          <div className="md:col-span-5 text-left space-y-4">
            {/* Headline Hook */}
            <p className="text-base sm:text-lg md:text-xl font-serif italic text-burgundy font-medium leading-snug">
              &ldquo;I’m someone who loves to learn, dreams big, works hard, and is never quite satisfied with ordinary.&rdquo;
            </p>

            {/* Faint Artistic Rotated Quote (~50% opacity, larger, rotated) */}
            <div className="pt-2 select-none">
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-burgundy/45 tracking-tight -rotate-2 transform inline-block leading-tight select-text">
                &ldquo;The harder I work, the luckier I get.&rdquo;
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Full CS Bio Summary (7 cols) */}
          <div className="md:col-span-7 text-left space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-dustyRose-dark uppercase tracking-wider font-semibold">
              <span>✦</span>
              <span>Background &amp; Focus</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-espresso/80 font-sans leading-relaxed">
              I’m a Computer Science Engineering student who enjoys turning ideas into practical solutions. Through projects and hands-on experiences, I’ve explored areas ranging from web and mobile development to backend systems, databases, and emerging technologies. I’m particularly drawn to understanding how things work behind the scenes, while always looking for opportunities to learn, build, and take on something new.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 flex flex-col items-center space-y-1 text-dustyRose pb-2">
        <span className="text-[11px] font-mono tracking-widest uppercase">
          Envelope Gallery Next
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-burgundy" />
      </div>
    </section>
  );
}
