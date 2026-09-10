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
      // Background PORTFOLIO drifts gently with blur, while KRITIKA stays anchored and crisp
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
          y: 60,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
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
          delay: 0.3,
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
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cream overflow-hidden px-4 py-28 sm:py-36 select-none"
    >
      {/* Editorial Decorative Grid & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C96F82_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Decorative Corner Scrapbook Stamps */}
      <div className="absolute top-10 left-8 sm:left-14 flex items-center space-x-2 text-xs font-mono text-dustyRose uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-burgundy" />
        <span>SEC. 02 &bull; IDENTITY</span>
      </div>

      <div className="absolute top-10 right-8 sm:right-14 hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve">
        <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
        <span>ARCHIVE REF: KP-2026</span>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 1 (BACK): GIANT BLURRED "PORTFOLIO" */}
      {/* ========================================================================= */}
      <div
        ref={bgWordRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
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

      {/* ========================================================================= */}
      {/* LAYER 2 (FOREGROUND): CRISP & PROMINENT "KRITIKA" */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Editorial Top Accent Ribbon */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blush border border-dustyRose/40 text-burgundy text-xs font-mono mb-4 sm:mb-6 shadow-sm">
          <span className="font-semibold tracking-wider uppercase">
            SOFTWARE ENGINEER &bull; CREATIVE BUILDER
          </span>
        </div>

        {/* The Dominant Foreground Name */}
        <h1
          ref={nameRef}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-serif font-bold text-burgundy tracking-tight leading-none drop-shadow-sm select-text"
        >
          KRITIKA
        </h1>

        {/* Metadata & Editorial Subtitle */}
        <div ref={metaRef} className="mt-6 sm:mt-8 space-y-4 max-w-3xl mx-auto">
          {/* Headline Hook */}
          <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-burgundy font-medium leading-snug">
            &ldquo;I’m someone who loves to learn, dreams big, works hard, and is never quite satisfied with ordinary.&rdquo;
          </p>

          {/* Extended Bio Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-espresso/80 font-sans leading-relaxed pt-1 max-w-2xl mx-auto">
            I’m a Computer Science Engineering student who enjoys turning ideas into practical solutions. Through projects and hands-on experiences, I’ve explored areas ranging from web and mobile development to backend systems, databases, and emerging technologies. I’m particularly drawn to understanding how things work behind the scenes, while always looking for opportunities to learn, build, and take on something new.
          </p>

          {/* Faint Artistic Rotated Quote (Watermark / Editorial Signature Layer) */}
          <div className="pt-6 sm:pt-8 select-none">
            <p className="font-serif italic text-2xl sm:text-3xl md:text-5xl text-burgundy/40 tracking-tight -rotate-1 transform inline-block drop-shadow-xs">
              &ldquo;The harder I work, the luckier I get.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center space-y-1 text-dustyRose">
        <span className="text-[11px] font-mono tracking-widest uppercase">
          Envelope Gallery Next
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-burgundy" />
      </div>
    </section>
  );
}
