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
  tilt?: string;
}

export const BOOKSHELF_VERSION: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 10;

export default function BookshelfHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const shelfSlotRef = useRef<HTMLDivElement>(null);
  const adjacentBookRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const frontCoverRef = useRef<HTMLDivElement>(null);
  const pagesBlockRef = useRef<HTMLDivElement>(null);
  const emergingElementsRef = useRef<HTMLDivElement>(null);
  const promptBadgeRef = useRef<HTMLDivElement>(null);

  const [bookState, setBookState] = useState<"on-shelf" | "pulling" | "in-foreground" | "opening" | "opened">(
    "on-shelf"
  );
  const [isVisible, setIsVisible] = useState(false);

  // Background shelf books
  const topShelfBooks: ShelfBook[] = [
    { id: 1, title: "Algorithms", bg: "bg-[#651F35]", text: "text-[#F7E6E8]", height: "h-36 sm:h-40", width: "w-8 sm:w-9", tilt: "-rotate-1" },
    { id: 2, title: "Django Master", bg: "bg-[#261C1E]", text: "text-[#FFF8F0]", height: "h-40 sm:h-44", width: "w-9 sm:w-10" },
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

  // Set initial position precisely on mount (Zero flash & flush shelf bottom)
  useEffect(() => {
    const slot = shelfSlotRef.current;
    const adj = adjacentBookRef.current;
    const container = containerRef.current;
    const book = bookRef.current;
    if (!book) return;

    let initX = 0;
    let initY = 0;

    if (slot && container && adj) {
      const slotRect = slot.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      const adjRect = adj.getBoundingClientRect();

      // Horizontally center inside the shelf slot
      initX = (slotRect.left + slotRect.width / 2) - (contRect.left + contRect.width / 2);

      // Vertically: using transformOrigin: "center bottom",
      // the unshifted bottom of the book is at (contCenterY + book.offsetHeight / 2).
      // We translate by (adjRect.bottom - (contCenterY + book.offsetHeight / 2)) - 12
      // so the book's bottom edge EXACTLY touches the shelf ledge flush with Spring Boot!
      const contCenterY = contRect.top + contRect.height / 2;
      const naturalBottom = contCenterY + (book.offsetHeight / 2);
      initY = (adjRect.bottom - naturalBottom) - 12;
    }

    // Position directly on shelf before displaying (prevents flash)
    gsap.set(book, {
      scale: 0.5,
      transformOrigin: "50% 100% 0px",
      x: initX,
      y: initY,
      z: 0,
      rotationX: 0,
      rotationY: 90, // Left spine forward facing viewer!
      rotationZ: 0,
      boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
    });

    // Exactly 1 second after page load, the book smoothly fades in directly in its shelf slot
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Action: Triggered when mouse touches (hovers) or clicks the glowing golden spine!
  const triggerBookPullOut = () => {
    if (bookState !== "on-shelf") return;
    setBookState("pulling");

    const ctx = gsap.context(() => {
      const book = bookRef.current;
      const shelf = shelfRef.current;
      const badge = promptBadgeRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          setBookState("in-foreground");
        },
      });

      // 1. Slides straight forward along Z-axis out from shelf row
      tl.to(book, {
        duration: 0.7,
        z: 130,
        rotationY: 80,
        ease: "power2.inOut",
      });

      // 2. Rotates 90° so spine swings to left and front cover faces viewer, settling in foreground
      tl.to(
        book,
        {
          duration: 1.3,
          scale: 0.95, // Comfortable distance with generous space all around
          x: 0,
          y: 0,
          z: 220,
          rotationX: 8,
          rotationY: -8, // Gentle presentation angle
          rotationZ: -1.5,
          boxShadow: "-20px 30px 55px rgba(0,0,0,0.8)",
          ease: "power3.out",
        },
        "-=0.1"
      );

      // 3. Background shelf softens gently
      tl.to(
        shelf,
        {
          duration: 1.3,
          filter: "blur(5px)",
          opacity: 0.5,
          scale: 0.96,
          ease: "power2.out",
        },
        "<0.1"
      );

      // 4. "Click to open" prompt appears
      tl.fromTo(
        badge,
        { opacity: 0, y: 20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

      gsap.to(badge, {
        y: "+=5",
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, containerRef);
  };

  // Handle Book Click -> Open Front Cover on spine hinge -> Emerge elements
  const handleBookClick = () => {
    if (bookState === "on-shelf") {
      triggerBookPullOut();
      return;
    }
    if (bookState !== "in-foreground") return;
    setBookState("opening");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setBookState("opened");
        },
      });

      // Hide prompt
      tl.to(promptBadgeRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.25,
        ease: "power2.in",
      });

      // Center opened book in viewport
      tl.to(bookRef.current, {
        scale: 1.05,
        rotationX: 4,
        rotationY: 0,
        rotationZ: 0,
        x: 60,
        duration: 0.6,
        ease: "power3.out",
      });

      // Front Cover swings open on its left spine hinge
      tl.to(frontCoverRef.current, {
        rotationY: -165,
        duration: 1.2,
        ease: "power3.inOut",
      });

      // Reveal inner spread
      tl.to(
        pagesBlockRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "<0.3"
      );

      // Emerging scrapbook cards pop out
      const emergingCards = containerRef.current?.querySelectorAll(".emerging-item");
      if (emergingCards && emergingCards.length > 0) {
        tl.fromTo(
          emergingCards,
          {
            scale: 0,
            opacity: 0,
            y: 40,
            rotation: () => gsap.utils.random(-15, 15),
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.4"
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
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#1b1214] text-cream select-none perspective-1500"
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

        {/* Middle Shelf (Houses the book row) */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-3 border-b-[20px] border-[#38262a] pb-1 shadow-[0_16px_25px_rgba(0,0,0,0.8)] px-4">
            {/* Left Cluster Books ending with API Design */}
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

            {/* Shelf Slot between API Design and Spring Boot */}
            <div
              ref={shelfSlotRef}
              className="w-10 sm:w-12 h-40 sm:h-44 border-l border-r border-[#1a1012] bg-[#140b0d]/70 rounded-t-sm flex items-center justify-center shadow-inner"
            >
              <span className="text-[7px] font-mono uppercase text-dustyRose/20 rotate-90 whitespace-nowrap">
                VACANT
              </span>
            </div>

            {/* Right Cluster Books starting with Spring Boot (Reference Baseline) */}
            {middleRightBooks.map((b, i) => (
              <div
                key={b.id}
                ref={i === 0 ? adjacentBookRef : null}
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(201,111,130,0.16)_0%,rgba(24,16,18,0.96)_75%)]" />

      {/* Version Tag Indicator (top right) */}
      <div className="absolute top-4 right-4 z-40 text-[10px] font-mono text-dustyRose/60 bg-espresso/60 px-2.5 py-1 rounded border border-blush/10">
        Bookshelf: v10 (1s Shelf Appearance &bull; Flush Ledge Baseline)
      </div>

      {/* Touch / Hover Cue while sitting on shelf */}
      {bookState === "on-shelf" && isVisible && (
        <div className="absolute bottom-10 z-30 flex items-center space-x-2 px-4 py-2 rounded-full bg-burgundy/80 text-cream border border-[#d8a47f]/60 shadow-lg backdrop-blur-sm pointer-events-none transition-opacity duration-500">
          <Sparkles className="w-3.5 h-3.5 text-[#d8a47f]" />
          <span className="text-xs font-mono tracking-wider uppercase font-semibold text-[#FFF8F0]">
            Touch the glowing book to pull it out
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNIFIED 3D PHYSICAL BOOK OBJECT (1S DELAY & FLUSH BASELINE)                 */}
      {/* ========================================================================= */}
      <div
        ref={bookRef}
        onMouseEnter={() => {
          if (bookState === "on-shelf" && isVisible) triggerBookPullOut();
        }}
        onClick={() => {
          if (!isVisible) return;
          handleBookClick();
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
          opacity: isVisible ? 1 : 0,
        }}
        className={`relative z-30 cursor-pointer w-[240px] sm:w-[260px] h-[330px] sm:h-[360px] transition-opacity duration-700 ease-out ${
          !isVisible ? "pointer-events-none" : ""
        } ${bookState === "on-shelf" ? "group" : ""}`}
      >
        {/* Physical 3D Book Box Container (Depth: 32px) */}
        <div className="relative w-full h-full preserve-3d">
          
          {/* 1. BACK COVER FACE */}
          <div
            style={{ transform: "translateZ(-16px)" }}
            className="absolute inset-0 bg-[#290c15] rounded-l-md border-2 border-[#57192a] shadow-2xl pointer-events-none"
          />

          {/* 2. LEFT SPINE FACE (FACES VIEWER ON SHELF WITH STEADY GOLDEN OUTLINE GLOW) */}
          <div
            style={{
              width: "32px",
              left: "-16px",
              transform: "rotateY(-90deg)",
              transformOrigin: "center center",
            }}
            className={`absolute top-0 bottom-0 bg-gradient-to-r from-[#210911] via-[#651F35] to-[#3a101d] border-t border-b border-[#822744] flex flex-col justify-between items-center py-4 pointer-events-auto select-none transition-all duration-300 ${
              bookState === "on-shelf"
                ? "ring-2 ring-[#d8a47f] shadow-[0_0_20px_rgba(216,164,127,0.85)] border-[#d8a47f]"
                : "shadow-md"
            }`}
          >
            {/* Top gold spine rib */}
            <div className="w-full h-1 bg-[#d8a47f]/70 border-t border-b border-black/40" />
            
            {/* Vertical spine title */}
            <div className="flex flex-col items-center space-y-1.5">
              <Sparkles className="w-3 h-3 text-[#d8a47f]" />
              <span
                style={{ writingMode: "vertical-rl" }}
                className="text-[10px] sm:text-[11px] font-serif tracking-[0.22em] text-[#FFF8F0] uppercase font-bold rotate-180 whitespace-nowrap drop-shadow"
              >
                KRITIKA PANWAR &bull; PORTFOLIO
              </span>
            </div>
            
            {/* Bottom gold spine rib */}
            <div className="w-full h-1 bg-[#d8a47f]/70 border-t border-b border-black/40" />
          </div>

          {/* 3. RIGHT PAGE-EDGES BLOCK (PAGES THICKNESS) */}
          <div
            style={{
              width: "32px",
              right: "-16px",
              transform: "rotateY(90deg)",
              transformOrigin: "center center",
            }}
            className="absolute top-1 bottom-1 bg-[#f7eedf] border-t border-b border-[#ded2bd] flex flex-col justify-around py-2 shadow-inner pointer-events-none opacity-95"
          >
            <div className="w-full h-[1px] bg-[#d9cbb0]/60" />
            <div className="w-full h-[1px] bg-[#d9cbb0]/60" />
            <div className="w-full h-[1px] bg-[#d9cbb0]/60" />
          </div>

          {/* 4. TOP & BOTTOM EDGES */}
          <div
            style={{
              height: "32px",
              top: "-16px",
              transform: "rotateX(90deg)",
              transformOrigin: "center center",
            }}
            className="absolute left-0 right-0 bg-[#eee2cf] pointer-events-none"
          />
          <div
            style={{
              height: "32px",
              bottom: "-16px",
              transform: "rotateX(-90deg)",
              transformOrigin: "center center",
            }}
            className="absolute left-0 right-0 bg-[#e2d5bf] pointer-events-none"
          />

          {/* 5. INTERIOR RIGHT PAGE (TABLE OF CONTENTS) */}
          <div
            ref={pagesBlockRef}
            style={{ transform: "translateZ(15px)" }}
            className={`absolute inset-0 bg-[#FFF8F0] text-espresso rounded-r-md p-5 flex flex-col justify-between border border-blush shadow-inner ${
              bookState === "opened" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-center text-[9px] font-mono text-mauve uppercase border-b border-blush pb-1.5">
              <span>CONTENTS</span>
              <span>INDEX</span>
            </div>

            <div className="my-auto space-y-2 text-[11px] font-mono">
              <div className="flex justify-between py-0.5 border-b border-blush/60">
                <span className="text-burgundy font-semibold">01. Identity</span>
                <span className="text-mauve text-[9px]">p. 02</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-blush/60">
                <span className="text-burgundy font-semibold">02. Memories</span>
                <span className="text-mauve text-[9px]">p. 04</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-blush/60">
                <span className="text-burgundy font-semibold">03. Certificates</span>
                <span className="text-mauve text-[9px]">p. 06</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-blush/60">
                <span className="text-burgundy font-semibold">04. Journey Path</span>
                <span className="text-mauve text-[9px]">p. 08</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-blush/60">
                <span className="text-burgundy font-semibold">05. 3D Tech Box</span>
                <span className="text-mauve text-[9px]">p. 10</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-blush flex justify-between text-[10px] font-mono text-dustyRose">
              <span>Scroll to Explore</span>
              <span>pg. 02</span>
            </div>
          </div>

          {/* 6. FRONT COVER (HINGED ON THE LEFT SPINE) */}
          <div
            ref={frontCoverRef}
            style={{
              transform: "translateZ(16px)",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* FRONT OF COVER */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 bg-[#3a101d] rounded-r-md border-2 border-[#822744] shadow-xl p-5 flex flex-col justify-between"
            >
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

              <div className="h-full w-full border border-dashed border-[#d8a47f]/45 p-3 flex flex-col justify-between rounded items-center text-center">
                <div className="flex items-center space-x-1 text-[#d8a47f] text-[10px] font-mono tracking-widest uppercase">
                  <Sparkles className="w-3 h-3 text-dustyRose" />
                  <span>Vol. 2026</span>
                  <Sparkles className="w-3 h-3 text-dustyRose" />
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.25em] font-mono text-dustyRose uppercase block">
                    Interactive Portfolio
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif text-[#FFF8F0] tracking-wide mt-1 font-bold">
                    KRITIKA
                  </h1>
                  <h2 className="text-lg sm:text-xl font-serif text-[#d8a47f] tracking-widest font-light">
                    PANWAR
                  </h2>
                  <div className="w-10 h-0.5 bg-[#d8a47f]/60 mx-auto my-2" />
                  <p className="text-[10px] font-mono text-blush/80">
                    Full Stack &bull; Python / Django
                  </p>
                </div>

                <div className="text-[9px] font-mono text-[#d8a47f]/90 uppercase tracking-widest flex items-center space-x-1.5">
                  <BookOpen className="w-3 h-3" />
                  <span>Tap to Open</span>
                </div>
              </div>
            </div>

            {/* BACK OF COVER (LEFT PAGE) */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 bg-[#FFF8F0] rounded-l-md border border-blush p-5 flex flex-col justify-between text-espresso shadow-lg"
            >
              <div className="flex justify-between items-center text-[9px] font-mono text-mauve uppercase border-b border-blush pb-1.5">
                <span>CHAPTER 01</span>
                <span>PROLOGUE</span>
              </div>

              <div className="my-auto space-y-2">
                <div className="w-8 h-8 rounded-full bg-blush flex items-center justify-center text-burgundy font-serif font-bold text-base border border-dustyRose/30">
                  K
                </div>
                <h3 className="font-serif text-base sm:text-lg text-burgundy leading-snug">
                  Welcome to my living portfolio.
                </h3>
                <p className="text-[11px] text-espresso/80 leading-relaxed font-sans">
                  A curated collection of full-stack engineering, scalable systems, and creative problem solving.
                </p>
              </div>

              <div className="pt-1.5 border-t border-blush flex justify-between text-[10px] font-mono text-dustyRose">
                <span>Kritika Panwar</span>
                <span>pg. 01</span>
              </div>
            </div>
          </div>
        </div>

        {/* EMERGING ELEMENTS (FLY OUT OF THE BOOK ON OPEN) */}
        {bookState === "opened" && (
          <div
            ref={emergingElementsRef}
            className="absolute inset-0 pointer-events-none z-40 overflow-visible"
          >
            <div className="emerging-item absolute -top-12 sm:-top-16 -left-16 sm:-left-28 bg-[#FFF8F0] text-burgundy p-3 rounded-xl shadow-2xl border border-dustyRose/40 w-44 -rotate-6 pointer-events-auto">
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold">
                <Code className="w-3.5 h-3.5 text-dustyRose" />
                <span>Full Stack Developer</span>
              </div>
              <p className="text-[10px] text-espresso/70 mt-0.5 font-sans">
                Python, Django &amp; Modern React
              </p>
            </div>

            <div className="emerging-item absolute -top-14 sm:-top-18 -right-12 sm:-right-24 bg-burgundy text-blush p-3 rounded-xl shadow-2xl border border-blush/30 w-40 rotate-10 pointer-events-auto">
              <div className="flex items-center space-x-1.5 text-xs font-mono">
                <Sparkles className="w-3 h-3 text-dustyRose-light" />
                <span>Scrapbook Edition</span>
              </div>
              <p className="text-[10px] text-blush/90 mt-0.5 font-serif italic">
                🌸 Dusty Pink &times; Burgundy
              </p>
            </div>

            <div className="emerging-item absolute -bottom-10 sm:-bottom-14 -left-12 sm:-left-24 bg-blush text-burgundy p-2.5 rounded-lg shadow-xl border border-dustyRose w-36 rotate-3 pointer-events-auto flex items-center space-x-2">
              <FolderGit2 className="w-3.5 h-3.5 text-burgundy" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="font-bold block">@kpanwar06</span>
                <span className="text-mauve text-[8px]">GitHub Repos</span>
              </div>
            </div>

            <div className="emerging-item absolute -bottom-12 sm:-bottom-16 -right-10 sm:-right-20 bg-[#FFF8F0] text-espresso p-2.5 rounded-lg shadow-xl border border-blush w-40 -rotate-3 pointer-events-auto flex items-center space-x-2">
              <Compass className="w-4 h-4 text-dustyRose" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="font-bold text-burgundy block">Journey Path</span>
                <span className="text-mauve text-[8px]">Scroll down</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PROMPT BADGE: "CLICK TO OPEN BOOK" (WHEN IN FOREGROUND) */}
      <div
        ref={promptBadgeRef}
        className="absolute bottom-8 z-30 flex flex-col items-center pointer-events-none"
      >
        {bookState === "in-foreground" && (
          <div className="px-5 py-2 rounded-full bg-burgundy/95 text-cream border border-dustyRose shadow-xl backdrop-blur-sm flex items-center space-x-2 animate-pulse">
            <BookOpen className="w-3.5 h-3.5 text-dustyRose-light" />
            <span className="text-xs font-mono tracking-wider uppercase font-semibold">
              Click the book to open
            </span>
          </div>
        )}

        {bookState === "opened" && (
          <button
            onClick={handleScrollToNext}
            className="pointer-events-auto px-5 py-2.5 rounded-full bg-burgundy text-cream hover:bg-burgundy-light border border-dustyRose shadow-2xl flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
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
