"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Sparkles, BookOpen, ChevronDown, Compass, Code, FolderGit2 } from "lucide-react";

interface ShelfBook {
  id: number;
  title: string;
  bg: string;
  text: string;
  height: string;
  width: string;
  ribColor?: string;
  tilt?: string;
}

export const BOOKSHELF_VERSION: 1 | 2 | 3 | 4 = 4;

export default function BookshelfHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const bookCoverRef = useRef<HTMLDivElement>(null);
  const bookPagesRef = useRef<HTMLDivElement>(null);
  const emergingElementsRef = useRef<HTMLDivElement>(null);
  const promptBadgeRef = useRef<HTMLDivElement>(null);

  const [bookState, setBookState] = useState<"on-shelf" | "in-foreground" | "opening" | "opened">(
    "on-shelf"
  );

  // Cleanly formatted, properly fitting book titles for background shelves
  const topShelfBooks: ShelfBook[] = [
    { id: 1, title: "Algorithms", bg: "bg-[#651F35]", text: "text-[#F7E6E8]", height: "h-36 sm:h-40", width: "w-8 sm:w-9", tilt: "-rotate-1" },
    { id: 2, title: "Django", bg: "bg-[#261C1E]", text: "text-[#FFF8F0]", height: "h-40 sm:h-44", width: "w-9 sm:w-10" },
    { id: 3, title: "Modern JS", bg: "bg-[#C96F82]", text: "text-white", height: "h-32 sm:h-36", width: "w-8 sm:w-9", tilt: "rotate-1" },
    { id: 4, title: "System Design", bg: "bg-[#A9828C]", text: "text-[#FFF8F0]", height: "h-44 sm:h-48", width: "w-10 sm:w-11" },
    { id: 5, title: "Distributed", bg: "bg-[#822744]", text: "text-[#F7E6E8]", height: "h-38 sm:h-42", width: "w-9 sm:w-10" },
    { id: 6, title: "Databases", bg: "bg-[#3B2D30]", text: "text-[#F7E6E8]", height: "h-36 sm:h-40", width: "w-8 sm:w-9", tilt: "-rotate-2" },
    { id: 7, title: "Apache Kafka", bg: "bg-[#B4576B]", text: "text-white", height: "h-42 sm:h-46", width: "w-10 sm:w-11" },
    { id: 8, title: "Clean Code", bg: "bg-[#651F35]", text: "text-[#F7E6E8]", height: "h-34 sm:h-38", width: "w-8 sm:w-9" },
    { id: 9, title: "Microservices", bg: "bg-[#8F6671]", text: "text-white", height: "h-38 sm:h-42", width: "w-9 sm:w-10", tilt: "rotate-1" },
    { id: 10, title: "Python 3.12", bg: "bg-[#261C1E]", text: "text-[#FFF8F0]", height: "h-36 sm:h-40", width: "w-8 sm:w-9" },
    { id: 11, title: "Web Architecture", bg: "bg-[#C96F82]", text: "text-white", height: "h-40 sm:h-44", width: "w-10 sm:w-11" },
  ];

  const middleLeftBooks: ShelfBook[] = [
    { id: 12, title: "Data Structures", bg: "bg-[#651F35]", text: "text-[#F7E6E8]", height: "h-44 sm:h-48", width: "w-10 sm:w-11" },
    { id: 13, title: "Python Core", bg: "bg-[#C96F82]", text: "text-white", height: "h-40 sm:h-44", width: "w-9 sm:w-10", tilt: "rotate-1" },
    { id: 14, title: "SQL Mastery", bg: "bg-[#A9828C]", text: "text-[#FFF8F0]", height: "h-36 sm:h-40", width: "w-8 sm:w-9" },
    { id: 15, title: "API Design", bg: "bg-[#3B2D30]", text: "text-[#F7E6E8]", height: "h-42 sm:h-46", width: "w-9 sm:w-10", tilt: "-rotate-1" },
  ];

  const middleRightBooks: ShelfBook[] = [
    { id: 16, title: "Spring Boot", bg: "bg-[#B4576B]", text: "text-white", height: "h-40 sm:h-44", width: "w-9 sm:w-10", tilt: "rotate-1" },
    { id: 17, title: "React 18", bg: "bg-[#651F35]", text: "text-[#F7E6E8]", height: "h-44 sm:h-48", width: "w-10 sm:w-11" },
    { id: 18, title: "Next.js App", bg: "bg-[#3B2D30]", text: "text-[#FFF8F0]", height: "h-38 sm:h-42", width: "w-9 sm:w-10", tilt: "-rotate-1" },
    { id: 19, title: "Cloud Ops", bg: "bg-[#8F6671]", text: "text-[#F7E6E8]", height: "h-36 sm:h-40", width: "w-8 sm:w-9" },
  ];

  const bottomShelfBooks: ShelfBook[] = [
    { id: 20, title: "Problem Solving", bg: "bg-[#A9828C]", text: "text-[#FFF8F0]", height: "h-40 sm:h-44", width: "w-10 sm:w-11", tilt: "rotate-1" },
    { id: 21, title: "Pragmatic Dev", bg: "bg-[#261C1E]", text: "text-[#FFF8F0]", height: "h-36 sm:h-40", width: "w-9 sm:w-10" },
    { id: 22, title: "UI Systems", bg: "bg-[#C96F82]", text: "text-white", height: "h-34 sm:h-38", width: "w-8 sm:w-9" },
    { id: 23, title: "Cloud Native", bg: "bg-[#651F35]", text: "text-[#F7E6E8]", height: "h-42 sm:h-46", width: "w-10 sm:w-11" },
    { id: 24, title: "REST Services", bg: "bg-[#8F6671]", text: "text-[#FFF8F0]", height: "h-38 sm:h-42", width: "w-9 sm:w-10", tilt: "-rotate-1" },
    { id: 25, title: "TypeScript", bg: "bg-[#261C1E]", text: "text-[#FFF8F0]", height: "h-40 sm:h-44", width: "w-9 sm:w-10" },
    { id: 26, title: "CI / CD Pipelines", bg: "bg-[#822744]", text: "text-[#F7E6E8]", height: "h-36 sm:h-40", width: "w-8 sm:w-9" },
    { id: 27, title: "Creative Code", bg: "bg-[#B4576B]", text: "text-white", height: "h-38 sm:h-42", width: "w-9 sm:w-10" },
    { id: 28, title: "Event Streams", bg: "bg-[#3B2D30]", text: "text-[#F7E6E8]", height: "h-34 sm:h-38", width: "w-8 sm:w-9", tilt: "rotate-1" },
    { id: 29, title: "Full Stack", bg: "bg-[#651F35]", text: "text-[#FFF8F0]", height: "h-42 sm:h-46", width: "w-10 sm:w-11" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const book = bookRef.current;
      const shelf = shelfRef.current;
      const badge = promptBadgeRef.current;
      if (!book) return;

      // =========================================================================
      // VERSION 4: FRONT-ANGLED SHELF DISPLAY -> 2s PAUSE -> GLIDES FORWARD
      // =========================================================================
      if (BOOKSHELF_VERSION === 4) {
        // Initial state: Entire book clearly displayed on middle shelf at front-angle
        gsap.set(book, {
          scale: 0.52,
          y: -36,
          x: 0,
          z: 0,
          rotationX: 8,
          rotationY: -12,
          rotationZ: -2,
          boxShadow: "-8px 12px 25px rgba(0,0,0,0.6)",
        });

        // The book sits completely still on the shelf for 2 SECONDS first!
        const tl = gsap.timeline({
          delay: 2.0, // 2-second pause as requested
          onComplete: () => {
            setBookState("in-foreground");
          },
        });

        // Smooth flight: glides forward facing user throughout the flight
        tl.to(book, {
          duration: 1.4,
          scale: 1.25,
          y: 0,
          x: 0,
          z: 320,
          rotationX: 10,
          rotationY: -8,
          rotationZ: -2,
          boxShadow: "-25px 35px 65px rgba(0,0,0,0.85)",
          ease: "power3.out",
        });

        // Background shelf gently blurs and dims as book reaches foreground
        tl.to(
          shelf,
          {
            duration: 1.4,
            filter: "blur(6px)",
            opacity: 0.48,
            scale: 0.94,
            ease: "power2.out",
          },
          "<0.1"
        );

        // Prompt badge appears
        tl.fromTo(
          badge,
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
          "-=0.3"
        );

        gsap.to(badge, {
          y: "+=6",
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });
      } else if (BOOKSHELF_VERSION === 3) {
        // Version 3 fallback
        gsap.set(book, { scale: 0.5, y: -42, x: 0, z: 0, rotationX: 0, rotationY: -80, rotationZ: 0 });
        const tl = gsap.timeline({ delay: 0.8, onComplete: () => setBookState("in-foreground") });
        tl.to(book, { duration: 0.8, z: 160, x: -15, rotationY: -65, ease: "power2.in" });
        tl.to(book, { duration: 1.4, scale: 1.25, y: 0, x: 0, z: 320, rotationX: 10, rotationY: -10, rotationZ: -2, ease: "power3.out" }, "-=0.2");
        tl.to(shelf, { duration: 1.4, filter: "blur(6px)", opacity: 0.5, scale: 0.94, ease: "power2.out" }, "<0.1");
        tl.fromTo(badge, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, "-=0.3");
      } else if (BOOKSHELF_VERSION === 2) {
        // Version 2 fallback
        gsap.set(book, { scale: 0.5, y: -45, x: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 });
        const tl = gsap.timeline({ delay: 0.8, onComplete: () => setBookState("in-foreground") });
        tl.to(book, { duration: 0.6, z: 120, rotationX: 18, rotationZ: -4, ease: "power1.inOut" });
        tl.to(book, { duration: 1.5, scale: 1.25, y: 0, x: 0, z: 320, rotationX: 10, rotationY: -10, rotationZ: -2, ease: "power3.out" }, "-=0.1");
        tl.to(shelf, { duration: 1.5, filter: "blur(6px)", opacity: 0.5, scale: 0.94, ease: "power2.out" }, "<0.1");
        tl.fromTo(badge, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, "-=0.3");
      } else {
        // Version 1 fallback
        const tl = gsap.timeline({ delay: 0.5, onComplete: () => setBookState("in-foreground") });
        tl.to(book, { duration: 1.4, y: 0, x: 0, scale: 1.25, rotationX: 12, rotationY: -10, rotationZ: -3, z: 300, ease: "power3.out" });
        tl.to(shelf, { duration: 1.4, filter: "blur(5px)", opacity: 0.55, scale: 0.95, ease: "power2.out" }, "<0.2");
        tl.fromTo(badge, { opacity: 0, y: 25, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle Book Click -> Open physical pages -> Emerge elements
  const handleBookClick = () => {
    if (bookState !== "in-foreground") return;
    setBookState("opening");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setBookState("opened");
        },
      });

      tl.to(promptBadgeRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(bookRef.current, {
        scale: 1.35,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      tl.to(bookCoverRef.current, {
        rotationY: -180,
        duration: 1.3,
        ease: "power3.inOut",
      });

      tl.to(bookPagesRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "<0.3");

      const emergingCards = containerRef.current?.querySelectorAll(".emerging-item");
      if (emergingCards && emergingCards.length > 0) {
        tl.fromTo(
          emergingCards,
          {
            scale: 0,
            opacity: 0,
            y: 50,
            z: 0,
            rotation: () => gsap.utils.random(-20, 20),
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            z: 100,
            stagger: 0.12,
            duration: 0.9,
            ease: "back.out(2)",
          },
          "-=0.5"
        );
      }
    }, containerRef);
  };

  const handleScrollToNext = () => {
    const nextSection = document.getElementById("identity");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="bookshelf-hero"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#1d1416] text-cream select-none perspective-1500"
    >
      {/* Background Library Bookshelf */}
      <div
        ref={shelfRef}
        className="absolute inset-0 flex flex-col justify-between py-10 px-4 sm:px-14 pointer-events-none transition-all duration-700"
      >
        {/* Top Shelf */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-3 border-b-[18px] border-[#38262a] pb-1 shadow-[0_16px_25px_rgba(0,0,0,0.8)]">
            {topShelfBooks.map((b) => (
              <div
                key={b.id}
                className={`${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
              >
                <div className="w-full h-0.5 bg-white/20" />
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-medium ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                >
                  {b.title}
                </span>
                <div className="w-full h-0.5 bg-white/20" />
              </div>
            ))}
          </div>
          <div className="h-3 w-full bg-[#52383e] rounded-b-sm border-t border-[#6b4c53]/40" />
        </div>

        {/* Middle Shelf (Houses the featured Portfolio Book) */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-4 border-b-[20px] border-[#38262a] pb-1 shadow-[0_16px_25px_rgba(0,0,0,0.8)] px-4">
            {/* Left Cluster Books */}
            <div className="flex items-end space-x-2 sm:space-x-3">
              {middleLeftBooks.map((b) => (
                <div
                  key={b.id}
                  className={`${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
                >
                  <div className="w-full h-0.5 bg-white/20" />
                  <span
                    style={{ writingMode: "vertical-rl" }}
                    className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-medium ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                  >
                    {b.title}
                  </span>
                  <div className="w-full h-0.5 bg-white/20" />
                </div>
              ))}
            </div>

            {/* Middle Display Stand Slot (Where Portfolio Book rests) */}
            <div className="w-36 sm:w-44 h-48 border border-dashed border-dustyRose/20 rounded-md flex flex-col items-center justify-end pb-2 bg-[#26171a]/40 shadow-inner">
              <span className="text-[9px] font-mono uppercase text-dustyRose/40 tracking-widest">
                [Featured Stand]
              </span>
            </div>

            {/* Right Cluster Books */}
            <div className="flex items-end space-x-2 sm:space-x-3">
              {middleRightBooks.map((b) => (
                <div
                  key={b.id}
                  className={`${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
                >
                  <div className="w-full h-0.5 bg-white/20" />
                  <span
                    style={{ writingMode: "vertical-rl" }}
                    className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-medium ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                  >
                    {b.title}
                  </span>
                  <div className="w-full h-0.5 bg-white/20" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-3 w-full bg-[#52383e] rounded-b-sm border-t border-[#6b4c53]/40" />
        </div>

        {/* Bottom Shelf */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-3 border-b-[18px] border-[#38262a] pb-1 shadow-[0_16px_25px_rgba(0,0,0,0.8)]">
            {bottomShelfBooks.map((b) => (
              <div
                key={b.id}
                className={`${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
              >
                <div className="w-full h-0.5 bg-white/20" />
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-medium ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                >
                  {b.title}
                </span>
                <div className="w-full h-0.5 bg-white/20" />
              </div>
            ))}
          </div>
          <div className="h-3 w-full bg-[#52383e] rounded-b-sm border-t border-[#6b4c53]/40" />
        </div>
      </div>

      {/* Atmospheric Vignette & Warm Spotlight */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(201,111,130,0.18)_0%,rgba(26,19,21,0.96)_75%)]" />

      {/* Version Tag Indicator (top right) */}
      <div className="absolute top-4 right-4 z-40 text-[10px] font-mono text-dustyRose/60 bg-espresso/60 px-2.5 py-1 rounded border border-blush/10">
        Bookshelf: v{BOOKSHELF_VERSION} (Front-Angle &bull; 2s Pause)
      </div>

      {/* 3D PORTFOLIO BOOK */}
      <div
        ref={bookRef}
        onClick={handleBookClick}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative z-30 cursor-pointer transition-shadow duration-500 ${
          bookState === "opened" ? "w-[340px] sm:w-[580px] h-[360px] sm:h-[400px]" : "w-[240px] sm:w-[280px] h-[340px] sm:h-[390px]"
        }`}
      >
        {/* Book Container with Dual Pages */}
        <div className="relative w-full h-full preserve-3d flex items-center justify-center">
          
          {/* Physical Book 3D Thickness Pages Side Edge */}
          <div
            style={{
              transform: "rotateY(90deg) translateZ(136px)",
              width: "28px",
              transformOrigin: "right center",
            }}
            className="absolute right-0 top-1 bottom-1 bg-[#fbf3e6] border-t border-b border-[#e2d5c1] shadow-inner flex flex-col justify-around py-2 opacity-95 pointer-events-none"
          >
            <div className="w-full h-[1px] bg-[#d9caa8]/40" />
            <div className="w-full h-[1px] bg-[#d9caa8]/40" />
            <div className="w-full h-[1px] bg-[#d9caa8]/40" />
          </div>

          {/* CLOSED BOOK / FRONT COVER */}
          <div
            className={`absolute inset-0 bg-[#3a101d] rounded-r-lg border-2 border-[#822744] shadow-[-20px_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 ${
              bookState === "opened" ? "hidden" : "flex"
            }`}
          >
            {/* Book Spine Texture */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-espresso via-burgundy-dark to-transparent opacity-80 rounded-l-sm" />

            {/* Gold foil embossed border */}
            <div className="h-full w-full border-2 border-dashed border-[#d8a47f]/40 p-4 flex flex-col justify-between rounded items-center text-center">
              <div className="flex items-center space-x-1 text-[#d8a47f] text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
                <span>Vol. 2026</span>
                <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
              </div>

              <div>
                <span className="text-xs tracking-[0.3em] font-mono text-dustyRose uppercase block">
                  Interactive Portfolio
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif text-[#FFF8F0] tracking-wide mt-1 font-bold drop-shadow">
                  KRITIKA
                </h1>
                <h2 className="text-xl sm:text-2xl font-serif text-[#d8a47f] tracking-widest font-light">
                  PANWAR
                </h2>
                <div className="w-12 h-0.5 bg-[#d8a47f]/60 mx-auto my-3" />
                <p className="text-[11px] font-mono text-blush/80 tracking-wider">
                  Full Stack &bull; Python/Django &bull; Creative Web
                </p>
              </div>

              <div className="text-[10px] font-mono text-[#d8a47f]/80 uppercase tracking-widest flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tap to Open</span>
              </div>
            </div>
          </div>

          {/* OPENED BOOK: DUAL PAGE SPREAD */}
          {bookState === "opened" && (
            <div
              ref={bookPagesRef}
              className="relative w-full h-full bg-[#FFF8F0] text-espresso rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex overflow-hidden border border-blush"
            >
              {/* Center Gutter / Spine Fold Shadow */}
              <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-espresso/15 to-transparent pointer-events-none z-20" />

              {/* LEFT PAGE */}
              <div className="w-1/2 h-full p-6 sm:p-8 flex flex-col justify-between border-r border-[#edd5d8] bg-[#FFF8F0] relative">
                <div className="flex justify-between items-center text-[10px] font-mono text-mauve tracking-widest uppercase border-b border-blush pb-2">
                  <span>CHAPTER 01</span>
                  <span>THE PROLOGUE</span>
                </div>

                <div className="my-auto space-y-3">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-burgundy font-serif font-bold text-xl border border-dustyRose/30">
                    K
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-burgundy leading-snug">
                    Welcome to my living portfolio.
                  </h3>
                  <p className="text-xs sm:text-sm text-espresso/80 leading-relaxed font-sans">
                    A curated collection of full-stack engineering, scalable systems, interactive visual arts, and creative problem solving.
                  </p>
                </div>

                <div className="pt-2 border-t border-blush/80 flex items-center justify-between text-[11px] font-mono text-dustyRose">
                  <span>Kritika Panwar</span>
                  <span>pg. 01</span>
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div className="w-1/2 h-full p-6 sm:p-8 flex flex-col justify-between bg-[#FFF8F0] relative">
                <div className="flex justify-between items-center text-[10px] font-mono text-mauve tracking-widest uppercase border-b border-blush pb-2">
                  <span>TABLE OF CONTENTS</span>
                  <span>INDEX</span>
                </div>

                <div className="my-auto space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between group py-1 border-b border-blush/60">
                    <span className="text-burgundy font-semibold">01. Identity &amp; Vision</span>
                    <span className="text-mauve text-[10px]">p. 02</span>
                  </div>
                  <div className="flex items-center justify-between group py-1 border-b border-blush/60">
                    <span className="text-burgundy font-semibold">02. Memory Gallery</span>
                    <span className="text-mauve text-[10px]">p. 04</span>
                  </div>
                  <div className="flex items-center justify-between group py-1 border-b border-blush/60">
                    <span className="text-burgundy font-semibold">03. Certifications &amp; Awards</span>
                    <span className="text-mauve text-[10px]">p. 06</span>
                  </div>
                  <div className="flex items-center justify-between group py-1 border-b border-blush/60">
                    <span className="text-burgundy font-semibold">04. Personal Journey Path</span>
                    <span className="text-mauve text-[10px]">p. 08</span>
                  </div>
                  <div className="flex items-center justify-between group py-1 border-b border-blush/60">
                    <span className="text-burgundy font-semibold">05. 3D Tech Stack Box</span>
                    <span className="text-mauve text-[10px]">p. 10</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-blush/80 flex items-center justify-between text-[11px] font-mono text-dustyRose">
                  <span>Scroll to Explore</span>
                  <span>pg. 02</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* EMERGING ELEMENTS (FLY OUT OF THE BOOK ON OPEN) */}
        {bookState === "opened" && (
          <div
            ref={emergingElementsRef}
            className="absolute inset-0 pointer-events-none z-40 overflow-visible"
          >
            <div className="emerging-item absolute -top-14 sm:-top-20 -left-12 sm:-left-24 bg-[#FFF8F0] text-burgundy p-3 sm:p-4 rounded-xl shadow-2xl border-2 border-dustyRose/40 w-44 sm:w-56 -rotate-6 pointer-events-auto backdrop-blur">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold">
                <Code className="w-4 h-4 text-dustyRose" />
                <span>Full Stack Developer</span>
              </div>
              <p className="text-[11px] text-espresso/70 mt-1 font-sans">
                Python, Django, React &amp; Cloud Native Architecture
              </p>
            </div>

            <div className="emerging-item absolute -top-16 sm:-top-24 -right-10 sm:-right-20 bg-burgundy text-blush p-3 sm:p-4 rounded-xl shadow-2xl border-2 border-blush/30 w-40 sm:w-48 rotate-12 pointer-events-auto">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-dustyRose-light" />
                <span>Scrapbook Edition</span>
              </div>
              <p className="text-[11px] text-blush/90 mt-1 font-serif italic">
                🌸 Dusty Pink &times; Burgundy
              </p>
            </div>

            <div className="emerging-item absolute -bottom-12 sm:-bottom-16 -left-10 sm:-left-20 bg-blush text-burgundy p-3 rounded-lg shadow-xl border border-dustyRose w-40 sm:w-48 rotate-3 pointer-events-auto flex items-center space-x-2">
              <FolderGit2 className="w-4 h-4 text-burgundy" />
              <div className="text-[11px] font-mono leading-tight">
                <span className="font-bold block">GitHub @kpanwar06</span>
                <span className="text-mauve text-[9px]">Open source &amp; repos</span>
              </div>
            </div>

            <div className="emerging-item absolute -bottom-14 sm:-bottom-20 -right-8 sm:-right-16 bg-[#FFF8F0] text-espresso p-3 rounded-lg shadow-xl border border-blush w-44 sm:w-52 -rotate-3 pointer-events-auto flex items-center space-x-3">
              <Compass className="w-5 h-5 text-dustyRose" />
              <div className="text-[11px] font-mono leading-tight">
                <span className="font-bold text-burgundy block">Interactive Path</span>
                <span className="text-mauve text-[9px]">Scroll to enter journey</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PROMPT BADGE: "CLICK TO OPEN BOOK" */}
      <div
        ref={promptBadgeRef}
        className="absolute bottom-10 z-30 flex flex-col items-center pointer-events-none"
      >
        {bookState === "in-foreground" && (
          <div className="px-5 py-2.5 rounded-full bg-burgundy/90 text-cream border border-dustyRose shadow-lg backdrop-blur-sm flex items-center space-x-2 animate-pulse">
            <BookOpen className="w-4 h-4 text-dustyRose-light" />
            <span className="text-xs font-mono tracking-wider uppercase font-semibold">
              Click the book to open
            </span>
          </div>
        )}

        {bookState === "opened" && (
          <button
            onClick={handleScrollToNext}
            className="pointer-events-auto px-6 py-3 rounded-full bg-burgundy text-cream hover:bg-burgundy-light border border-dustyRose shadow-2xl flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-xs font-mono tracking-widest uppercase font-bold">
              Explore Portfolio
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-dustyRose-light" />
          </button>
        )}
      </div>
    </section>
  );
}
