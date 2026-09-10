"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, BookOpen, ChevronDown, Compass, Code, FolderGit2, Github, Linkedin } from "lucide-react";

// True perforated postage stamp SVG scalloped edge path (56x68)
const STAMP_PATH =
  "M 0 0 H 5.5 A 2.5 2.5 0 0 0 10.5 0 H 13.5 A 2.5 2.5 0 0 0 18.5 0 H 21.5 A 2.5 2.5 0 0 0 26.5 0 H 29.5 A 2.5 2.5 0 0 0 34.5 0 H 37.5 A 2.5 2.5 0 0 0 42.5 0 H 45.5 A 2.5 2.5 0 0 0 50.5 0 H 56 V 5.5 A 2.5 2.5 0 0 0 56 10.5 V 13.5 A 2.5 2.5 0 0 0 56 18.5 V 21.5 A 2.5 2.5 0 0 0 56 26.5 V 29.5 A 2.5 2.5 0 0 0 56 34.5 V 37.5 A 2.5 2.5 0 0 0 56 42.5 V 45.5 A 2.5 2.5 0 0 0 56 50.5 V 53.5 A 2.5 2.5 0 0 0 56 58.5 V 61.5 A 2.5 2.5 0 0 0 56 66.5 V 68 H 50.5 A 2.5 2.5 0 0 0 45.5 68 H 42.5 A 2.5 2.5 0 0 0 37.5 68 H 34.5 A 2.5 2.5 0 0 0 29.5 68 H 26.5 A 2.5 2.5 0 0 0 21.5 68 H 18.5 A 2.5 2.5 0 0 0 13.5 68 H 10.5 A 2.5 2.5 0 0 0 5.5 68 H 0 V 62.5 A 2.5 2.5 0 0 0 0 57.5 V 54.5 A 2.5 2.5 0 0 0 0 49.5 V 46.5 A 2.5 2.5 0 0 0 0 41.5 V 38.5 A 2.5 2.5 0 0 0 0 33.5 V 30.5 A 2.5 2.5 0 0 0 0 25.5 V 22.5 A 2.5 2.5 0 0 0 0 17.5 V 14.5 A 2.5 2.5 0 0 0 0 9.5 V 6.5 A 2.5 2.5 0 0 0 0 1.5 Z";

interface ShelfBook {
  id: number;
  title: string;
  bg: string;
  text: string;
  height: string;
  width: string;
  tilt?: string;
}

export const BOOKSHELF_VERSION: number = 29;

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

  // Lock page scrolling until the portfolio book is opened (zero layout shifts, no overflow: hidden toggles)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = (window as any).__lenis;

    if (bookState !== "opened") {
      window.scrollTo(0, 0);
      if (lenis) lenis.stop();

      let lastActionTime = 0;
      const preventAndProgress = (e: WheelEvent) => {
        e.preventDefault();
        const now = Date.now();
        if (now - lastActionTime < 650) return;

        if (e.deltaY > 25) {
          lastActionTime = now;
          if (bookState === "on-shelf") {
            triggerBookPullOut();
          } else if (bookState === "in-foreground") {
            handleBookClick();
          }
        }
      };

      const preventTouch = (e: TouchEvent) => {
        e.preventDefault();
      };

      const preventKeys = (e: KeyboardEvent) => {
        const blockedKeys = [
          "Space",
          "PageDown",
          "PageUp",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End",
        ];
        if (blockedKeys.includes(e.code) || blockedKeys.includes(e.key)) {
          e.preventDefault();
          if (e.key === "ArrowDown" || e.key === "PageDown" || e.code === "Space") {
            const now = Date.now();
            if (now - lastActionTime > 650) {
              lastActionTime = now;
              if (bookState === "on-shelf") {
                triggerBookPullOut();
              } else if (bookState === "in-foreground") {
                handleBookClick();
              }
            }
          }
        }
      };

      window.addEventListener("wheel", preventAndProgress, { passive: false });
      window.addEventListener("touchmove", preventTouch, { passive: false });
      window.addEventListener("keydown", preventKeys);

      return () => {
        window.removeEventListener("wheel", preventAndProgress);
        window.removeEventListener("touchmove", preventTouch);
        window.removeEventListener("keydown", preventKeys);
      };
    } else {
      if (lenis) {
        lenis.start();
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    }
  }, [bookState]);

  // Custom editorial scrollbar appears ONLY from Section 2 onwards (completely transparent on Section 1)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;
      const threshold = heroHeight * 0.35;
      const shouldBeHeroActive = scrollY <= threshold;
      const isCurrentlyActive = document.documentElement.classList.contains("hero-active");

      if (shouldBeHeroActive !== isCurrentlyActive) {
        document.documentElement.classList.toggle("hero-active", shouldBeHeroActive);
        document.body.classList.toggle("hero-active", shouldBeHeroActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("hero-active");
      document.body.classList.remove("hero-active");
    };
  }, []);

  // Smooth scroll exit when transitioning from Hero to Identity (zero-lag synchronized scrub)
  useEffect(() => {
    if (bookState !== "opened") return;

    const ctx = gsap.context(() => {
      gsap.to(bookRef.current, {
        y: -120,
        opacity: 0.15,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [bookState]);

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

  // Action: Triggered when mouse touches (hovers) or clicks the portfolio book on shelf!
  const triggerBookPullOut = () => {
    if (bookState !== "on-shelf") return;

    const book = bookRef.current;
    const shelf = shelfRef.current;
    const badge = promptBadgeRef.current;
    const slot = shelfSlotRef.current;
    const container = containerRef.current;
    if (!book || !slot || !container) return;

    const slotRect = slot.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();

    const initX = slotRect.left + slotRect.width / 2 - (contRect.left + contRect.width / 2);
    const scaledBookHeight = (book.offsetHeight || 355) * 0.5;
    const targetCenterY = slotRect.bottom - scaledBookHeight / 2;
    const contCenterY = contRect.top + contRect.height / 2;
    const initY = targetCenterY - contCenterY;

    // Immediately snap 3D book box to the exact slot position and make visible with GPU acceleration
    gsap.set(book, {
      scale: 0.5,
      transformOrigin: "center center",
      x: initX,
      y: initY,
      z: 0,
      rotationX: 0,
      rotationY: 90,
      rotationZ: 0,
      boxShadow: "none",
      opacity: 1,
      visibility: "visible",
      force3D: true,
    });

    setBookState("pulling");

    const tl = gsap.timeline({
      onComplete: () => {
        setBookState("in-foreground");
      },
    });

    // 1. Smoothly pulls straight forward along Z-axis out of the shelf slot
    tl.to(book, {
      duration: 0.45,
      z: 140,
      ease: "power1.in",
      force3D: true,
    });

    // 2. Fluidly continues momentum, glides to center and rotates to present cover
    tl.to(book, {
      duration: 1.15,
      scale: 0.95,
      x: 0,
      y: 0,
      z: 240,
      rotationX: 7,
      rotationY: -7,
      rotationZ: -1.5,
      ease: "power2.out",
      force3D: true,
    });

    // 3. Background shelves soften gently with GPU-accelerated opacity and subtle scale
    if (shelf) {
      tl.to(
        shelf,
        {
          duration: 1.15,
          opacity: 0.4,
          scale: 0.985,
          ease: "power2.out",
          force3D: true,
        },
        "<0.05"
      );
    }

    // 4. "Click to open" prompt appears
    if (badge) {
      tl.fromTo(
        badge,
        { opacity: 0, y: 20, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.2"
      );

      gsap.to(badge, {
        y: "+=5",
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }
  };

  // Handle Book Click -> Open Front Cover on spine hinge -> Emerge elements
  const handleBookClick = () => {
    if (bookState === "on-shelf") {
      triggerBookPullOut();
      return;
    }
    if (bookState !== "in-foreground") return;
    setBookState("opening");

    const book = bookRef.current;
    const frontCover = frontCoverRef.current;
    const pagesBlock = pagesBlockRef.current;
    const badge = promptBadgeRef.current;
    if (!book || !frontCover) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setBookState("opened");
      },
    });

    // Hide prompt
    if (badge) {
      tl.to(badge, {
        opacity: 0,
        scale: 0.85,
        duration: 0.25,
        ease: "power2.in",
      });
    }

    // Shift book so its left edge (spine) is at the exact middle of the page
    const bookHalfWidth = ((book.offsetWidth || 260) * 1.05) / 2;

    tl.to(book, {
      scale: 1.05,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      x: bookHalfWidth,
      duration: 0.6,
      ease: "power3.out",
    });

    // Front Cover swings open flat on its left spine hinge
    tl.to(frontCover, {
      rotationY: -180,
      duration: 1.2,
      ease: "power3.inOut",
    });

    // Reveal inner spread
    tl.to(
      pagesBlock,
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
  };

  const chapters = [
    { num: "01", title: "Identity", page: "p. 02", targetId: "identity" },
    { num: "02", title: "Memory Archive", page: "p. 04", targetId: "envelope" },
    { num: "03", title: "Featured Projects", page: "p. 06", targetId: "projects" },
    { num: "04", title: "3D Tech Stack", page: "p. 08", targetId: "tech-stack" },
    { num: "05", title: "Certifications", page: "p. 10", targetId: "certifications" },
    { num: "06", title: "Journey Trail", page: "p. 12", targetId: "journey" },
  ];

  const navigateToSection = (targetId: string) => {
    const lenis = (window as any).__lenis;
    const target = document.getElementById(targetId);
    if (lenis) {
      lenis.start();
      if (target) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      } else {
        const fallback = document.getElementById("identity");
        if (fallback) lenis.scrollTo(fallback, { offset: 0, duration: 1.5 });
      }
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToNext = () => {
    const lenis = (window as any).__lenis;
    const nextSection = document.getElementById("identity");
    if (lenis && nextSection) {
      lenis.scrollTo(nextSection, { offset: 0, duration: 1.4 });
    } else if (nextSection) {
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
        className="absolute inset-0 flex flex-col justify-between py-10 px-4 sm:px-14 pointer-events-none"
      >
        {/* Top Shelf */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-3">
            {topShelfBooks.map((b) => (
              <div
                key={b.id}
                className={`flex-shrink-0 ${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
              >
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-bold ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                >
                  {b.title}
                </span>
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
              </div>
            ))}
          </div>
          <div className="h-3 sm:h-3.5 w-full bg-[#52383e] rounded-b-sm border-t border-[#6b4c53]/40 shadow-[0_16px_25px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Middle Shelf (Houses the book row) */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-3 px-4">
            {/* Left Cluster Books ending with API Design */}
            {middleLeftBooks.map((b) => (
              <div
                key={b.id}
                className={`flex-shrink-0 ${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
              >
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-bold ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                >
                  {b.title}
                </span>
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
              </div>
            ))}

            {/* Shelf Slot (Between API Design and Spring Boot) */}
            <div
              ref={shelfSlotRef}
              onMouseEnter={() => {
                if (bookState === "on-shelf") triggerBookPullOut();
              }}
              onClick={() => {
                if (bookState === "on-shelf") triggerBookPullOut();
              }}
              className="flex-shrink-0 w-8 sm:w-9 h-40 sm:h-44 rounded-t-sm flex items-end justify-center pointer-events-auto cursor-pointer group select-none"
            >
              {bookState === "on-shelf" ? (
                /* Native Shelf Book Spine - Paints INSTANTLY on first HTML paint (0ms delay) */
                <div className="w-full h-full bg-gradient-to-r from-[#210911] via-[#651F35] to-[#3a101d] border-t border-b border-[#822744] rounded-t-sm shadow-md flex flex-col justify-between items-center py-4 select-none border-r border-[#822744]/40">
                  {/* Top gold spine rib */}
                  <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />

                  {/* Vertical spine title: ONLY "PORTFOLIO" */}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Sparkles className="w-3 h-3 text-[#d8a47f]" />
                    <span
                      style={{ writingMode: "vertical-rl" }}
                      className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#FFF8F0] uppercase font-bold rotate-180 whitespace-nowrap"
                    >
                      PORTFOLIO
                    </span>
                    <Sparkles className="w-3 h-3 text-[#d8a47f]" />
                  </div>

                  {/* Bottom gold spine rib */}
                  <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
                </div>
              ) : (
                <div className="w-full h-full border-l border-r border-[#1a1012] bg-[#120a0d]/90 rounded-t-sm shadow-inner" />
              )}
            </div>

            {/* Right Cluster Books starting with Spring Boot (Reference Baseline) */}
            {middleRightBooks.map((b, i) => (
              <div
                key={b.id}
                ref={i === 0 ? adjacentBookRef : null}
                className={`flex-shrink-0 ${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
              >
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-bold ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                >
                  {b.title}
                </span>
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
              </div>
            ))}
          </div>
          <div className="h-3 sm:h-3.5 w-full bg-[#52383e] rounded-b-sm border-t border-[#6b4c53]/40 shadow-[0_16px_25px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Bottom Shelf */}
        <div className="relative w-full">
          <div className="flex items-end justify-center space-x-2 sm:space-x-3">
            {bottomShelfBooks.map((b) => (
              <div
                key={b.id}
                className={`flex-shrink-0 ${b.height} ${b.width} ${b.bg} ${b.tilt || ""} rounded-t-sm shadow-md flex flex-col items-center justify-between py-2 border-t border-r border-white/10`}
              >
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
                <span
                  style={{ writingMode: "vertical-rl" }}
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider rotate-180 uppercase font-bold ${b.text} max-h-[85%] overflow-hidden text-ellipsis`}
                >
                  {b.title}
                </span>
                <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
              </div>
            ))}
          </div>
          <div className="h-3 sm:h-3.5 w-full bg-[#52383e] rounded-b-sm border-t border-[#6b4c53]/40 shadow-[0_16px_25px_rgba(0,0,0,0.8)]" />
        </div>
      </div>

      {/* Atmospheric Vignette & Warm Spotlight */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(201,111,130,0.16)_0%,rgba(24,16,18,0.96)_75%)]" />

      {/* Touch / Hover Cue while sitting on shelf */}
      {bookState === "on-shelf" && (
        <div className="absolute bottom-10 z-30 flex items-center space-x-2 px-4 py-2 rounded-full bg-burgundy/80 text-cream border border-blush/20 shadow-lg backdrop-blur-sm pointer-events-none transition-opacity duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#d8a47f]" />
          <span className="text-xs font-mono tracking-wider uppercase font-semibold text-[#FFF8F0]">
            Touch the portfolio book to pull it out
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UNIFIED 3D PHYSICAL BOOK OBJECT (SLIM SHELF FIT & EXPANDED FOREGROUND)   */}
      {/* ========================================================================= */}
      <div
        ref={bookRef}
        onClick={() => {
          if (bookState === "in-foreground") {
            handleBookClick();
          }
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          visibility: bookState === "on-shelf" ? "hidden" : "visible",
          opacity: bookState === "on-shelf" ? 0 : 1,
        }}
        className="absolute z-30 cursor-pointer w-[240px] sm:w-[260px] h-[330px] sm:h-[355px] select-none"
      >
        {/* Physical 3D Book Box Container (Depth: 32px - Standard Slim Shelf Fit) */}
        <div className="relative w-full h-full preserve-3d">
          {/* 1. BACK COVER FACE */}
          <div
            style={{ transform: "translateZ(-16px)" }}
            className="absolute inset-0 bg-[#290c15] rounded-l-md border-2 border-[#57192a] shadow-2xl pointer-events-none"
          />

          {/* 2. LEFT SPINE FACE (FACES VIEWER ON SHELF - AUTHENTIC SLIM LEATHER BINDING) */}
          <div
            style={{
              width: "32px",
              left: "-16px",
              transform: "rotateY(-90deg)",
              transformOrigin: "center center",
            }}
            className="absolute top-0 bottom-0 bg-gradient-to-r from-[#210911] via-[#651F35] to-[#3a101d] border-t border-b border-[#822744] rounded-t-sm shadow-md flex flex-col justify-between items-center py-4 pointer-events-auto select-none border-r border-[#822744]/40"
          >
            {/* Top gold spine rib */}
            <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />

            {/* Vertical spine title: ONLY "PORTFOLIO" */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <Sparkles className="w-3 h-3 text-[#d8a47f]" />
              <span
                style={{ writingMode: "vertical-rl" }}
                className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#FFF8F0] uppercase font-bold rotate-180 whitespace-nowrap"
              >
                PORTFOLIO
              </span>
              <Sparkles className="w-3 h-3 text-[#d8a47f]" />
            </div>

            {/* Bottom gold spine rib */}
            <div className="w-full h-1 bg-[#d8a47f]/75 border-t border-b border-black/40" />
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
            className="absolute left-0 right-0 bg-[#ded0bb] pointer-events-none"
          />

          {/* 5. INTERIOR RIGHT PAGE (TABLE OF CONTENTS) */}
          <div
            ref={pagesBlockRef}
            style={{
              transform: "translateZ(15px)",
            }}
            className={`absolute inset-0 bg-[#FFF8F0] text-espresso rounded-r-md p-4 sm:p-5 flex flex-col justify-between border border-blush shadow-inner transition-opacity duration-300 ${
              bookState === "opened" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Brass Paperclip holding Parchment Tag ("Updated • 2026") */}
            <div className="absolute -top-2.5 right-4 sm:right-5 z-20 pointer-events-none select-none flex items-center">
              <div className="relative">
                {/* Paperclip wire clasping down over the page edge and tag (shifted down 6px, left 2px) */}
                <svg
                  width="18"
                  height="32"
                  viewBox="0 0 18 32"
                  fill="none"
                  className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] relative z-10 translate-y-[6px] -translate-x-[2px]"
                >
                  <path
                    d="M5 9 V24 C5 26.5 7 28.5 9.5 28.5 C12 28.5 14 26.5 14 24 V5 C14 3 12.5 1.5 10 1.5 C7.5 1.5 6 3 6 5 V21 C6 22.5 7 23.5 8.5 23.5 C10 23.5 11 22.5 11 21 V8"
                    stroke="url(#brass-clip-grad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="brass-clip-grad" x1="5" y1="1.5" x2="14" y2="28.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F5D7A1" />
                      <stop offset="0.3" stopColor="#D4A359" />
                      <stop offset="0.7" stopColor="#9E6D2B" />
                      <stop offset="1" stopColor="#E2BD7E" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Parchment Tag held under the clip on the page (clip clasps right margin, text cleanly legible) */}
                <div
                  style={{ transform: "rotate(-1deg)" }}
                  className="absolute top-2.5 right-[-2px] pl-2 pr-5 py-0.5 bg-[#FFFDF7] border border-[#DEC8A4] rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.12)] whitespace-nowrap z-0 flex items-center"
                >
                  <span className="text-[7.5px] sm:text-[8px] font-mono tracking-wider text-burgundy font-bold uppercase">
                    Updated &bull; 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Header with right margin reserved for the clip */}
            <div className="flex items-center space-x-1.5 text-[9px] font-mono text-mauve uppercase border-b border-blush pb-1.5 pr-22">
              <span className="tracking-wider">CONTENTS</span>
              <span className="text-blush">&bull;</span>
              <span className="tracking-wider">INDEX</span>
            </div>

            {/* 6 Interactive Chapters */}
            <div className="my-auto space-y-1 sm:space-y-1.5 text-[9.5px] font-mono">
              {chapters.map((ch) => (
                <div
                  key={ch.num}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToSection(ch.targetId);
                  }}
                  className="flex justify-between items-center py-0.5 sm:py-1 px-1.5 rounded hover:bg-[#F7E6E8]/80 hover:text-burgundy transition-colors cursor-pointer border-b border-blush/40 group select-none"
                >
                  <span className="text-burgundy font-semibold group-hover:translate-x-0.5 transition-transform">
                    {ch.num}. {ch.title}
                  </span>
                  <span className="text-mauve text-[8.5px] group-hover:text-burgundy">{ch.page}</span>
                </div>
              ))}
            </div>

            {/* Tactile Washi Tape Note */}
            <div className="relative mx-auto w-full max-w-[195px] px-2 py-1 bg-[#FFFDF8] border border-[#EADBCE] rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] rotate-0.5 select-none my-0.5">
              {/* Semi-translucent Washi Tape Strip */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-[#C96F82]/35 border-t border-b border-[#C96F82]/45 backdrop-blur-[0.5px] -rotate-1 pointer-events-none shadow-2xs" />
              <p className="text-[8px] sm:text-[8.5px] font-serif italic text-burgundy/90 text-center leading-tight">
                &ldquo;P.S. Click any chapter to jump directly to that archive.&rdquo;
              </p>
            </div>

            {/* Clean Footer: ONLY pg. 02 */}
            <div className="pt-1.5 border-t border-blush flex justify-end text-[10px] font-mono text-dustyRose">
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
                <div className="flex items-center space-x-1 text-[#d8a47f] text-[9.5px] font-mono tracking-widest uppercase">
                  <span>✦ PERSONAL ARCHIVE ✦</span>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.25em] font-mono text-dustyRose uppercase block">
                    THE STORY SO FAR
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-serif text-[#FFF8F0] tracking-wide mt-1 font-bold">
                    KRITIKA
                  </h1>
                  <h2 className="text-lg sm:text-xl font-serif text-[#d8a47f] tracking-widest font-light">
                    PANWAR
                  </h2>
                  <div className="w-10 h-0.5 bg-[#d8a47f]/60 mx-auto my-2" />
                  <p className="text-[9.5px] font-mono text-blush/80">
                    Technology &bull; Creativity &bull; Curiosity
                  </p>
                </div>

                <div className="text-[9px] font-mono text-[#d8a47f]/90 uppercase tracking-widest flex items-center space-x-1.5">
                  <BookOpen className="w-3 h-3" />
                  <span>Step Inside</span>
                </div>
              </div>
            </div>

            {/* BACK OF COVER (LEFT PAGE) */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 bg-[#FFF8F0] rounded-l-md border border-blush p-4 sm:p-5 flex flex-col justify-between text-espresso shadow-lg"
            >
              <div className="flex justify-between items-center text-[9px] font-mono text-mauve uppercase border-b border-blush pb-1.5">
                <span>CHAPTER 01</span>
                <span>PROLOGUE</span>
              </div>

              <div className="my-auto space-y-2">
                {/* Stylized Calligraphic Cursive "K" Monogram (Clean Drop-Cap) */}
                <div className="py-0.5">
                  <svg
                    width="46"
                    height="56"
                    viewBox="0 0 100 130"
                    fill="none"
                    className="drop-shadow-xs select-none"
                  >
                    <path
                      d="M12 28 C22 18, 32 38, 28 65 C24 88, 16 112, 22 124 C25 128, 29 124, 32 116 C38 98, 42 72, 33 60 C26 50, 16 58, 28 62"
                      stroke="#651F35"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29 60 C38 48, 48 24, 46 12 C45 6, 41 8, 38 18 C33 34, 28 52, 32 60"
                      stroke="#651F35"
                      strokeWidth="3.0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31 60 C38 68, 46 84, 56 102 C66 118, 78 126, 86 118 C92 112, 88 100, 78 98 C72 97, 68 102, 70 106"
                      stroke="#651F35"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M46 12 C40 28, 32 50, 31 60 C36 72, 48 94, 62 110"
                      stroke="#d8a47f"
                      strokeWidth="1.0"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>
                </div>

                <h3 className="font-serif text-base sm:text-lg text-burgundy leading-snug font-bold">
                  Welcome to my little corner of the internet.
                </h3>
                <p className="text-[10px] sm:text-[10.5px] text-espresso/80 leading-relaxed font-sans">
                  A curated collection of my journey &mdash; what I&rsquo;ve learned, built, explored, and experienced along the way.
                </p>

                {/* Handwritten Author Sign-off */}
                <div className="pt-1.5 flex items-center justify-start border-t border-blush/60 select-none">
                  <span className="font-serif italic font-semibold text-[13px] sm:text-[14px] text-burgundy tracking-wide">
                    &mdash; Kritika Panwar
                  </span>
                </div>

                {/* Two Dainty Perforated Postage Stamps (Aligned to left edge below the dash) */}
                <div className="pt-2 flex items-center justify-start space-x-4 select-none">
                  {/* GitHub Postage Stamp */}
                  <a
                    href="https://github.com/Kritika-Panwar-151/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group relative w-[42px] h-[52px] flex items-center justify-center -rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-200 cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                    title="GitHub: Kritika-Panwar-151"
                  >
                    {/* SVG Scalloped Perforated Stamp Base */}
                    <svg
                      width="42"
                      height="52"
                      viewBox="-1 -1 58 70"
                      fill="none"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                      <path
                        d={STAMP_PATH}
                        fill="#FFFDF7"
                        stroke="#DEC8A4"
                        strokeWidth="1"
                        className="group-hover:fill-[#FBF5EC] transition-colors"
                      />
                      <rect
                        x="5"
                        y="5"
                        width="46"
                        height="58"
                        rx="1.5"
                        fill="none"
                        stroke="#D8A47F"
                        strokeWidth="0.75"
                        strokeDasharray="2 1.5"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Stamp Interior Artwork */}
                    <div className="relative z-10 flex flex-col items-center justify-between h-[38px] py-0.5">
                      <span className="text-[5px] sm:text-[5.5px] font-mono tracking-widest text-[#9E6D2B] font-bold uppercase">
                        GIT
                      </span>
                      <div className="w-4 h-4 rounded-full bg-burgundy/5 flex items-center justify-center group-hover:bg-burgundy/10 transition-colors">
                        <Github className="w-2.5 h-2.5 text-burgundy group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-[5.5px] font-mono tracking-wider font-bold text-burgundy uppercase">
                        GitHub
                      </span>
                    </div>

                    {/* Faint Wavy Cancellation Postmark lines */}
                    <svg
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 pointer-events-none opacity-35"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <path
                        d="M2 8 Q 8 4, 14 8 T 26 8 M2 14 Q 8 10, 14 14 T 26 14 M2 20 Q 8 16, 14 20 T 26 20"
                        stroke="#651F35"
                        strokeWidth="0.8"
                      />
                    </svg>
                  </a>

                  {/* LinkedIn Postage Stamp */}
                  <a
                    href="https://www.linkedin.com/in/kritika-panwar-601721312/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group relative w-[42px] h-[52px] flex items-center justify-center rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-200 cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                    title="LinkedIn: Kritika Panwar"
                  >
                    {/* SVG Scalloped Perforated Stamp Base */}
                    <svg
                      width="42"
                      height="52"
                      viewBox="-1 -1 58 70"
                      fill="none"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                      <path
                        d={STAMP_PATH}
                        fill="#FFFDF7"
                        stroke="#DEC8A4"
                        strokeWidth="1"
                        className="group-hover:fill-[#FBF5EC] transition-colors"
                      />
                      <rect
                        x="5"
                        y="5"
                        width="46"
                        height="58"
                        rx="1.5"
                        fill="none"
                        stroke="#D8A47F"
                        strokeWidth="0.75"
                        strokeDasharray="2 1.5"
                        opacity="0.8"
                      />
                    </svg>

                    {/* Stamp Interior Artwork */}
                    <div className="relative z-10 flex flex-col items-center justify-between h-[38px] py-0.5">
                      <span className="text-[5px] sm:text-[5.5px] font-mono tracking-widest text-[#9E6D2B] font-bold uppercase">
                        NET
                      </span>
                      <div className="w-4 h-4 rounded-full bg-burgundy/5 flex items-center justify-center group-hover:bg-burgundy/10 transition-colors">
                        <Linkedin className="w-2.5 h-2.5 text-burgundy group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-[5.5px] font-mono tracking-wider font-bold text-burgundy uppercase">
                        LinkedIn
                      </span>
                    </div>

                    {/* Faint Wavy Cancellation Postmark lines */}
                    <svg
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 pointer-events-none opacity-35"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <path
                        d="M2 8 Q 8 4, 14 8 T 26 8 M2 14 Q 8 10, 14 14 T 26 14 M2 20 Q 8 16, 14 20 T 26 20"
                        stroke="#651F35"
                        strokeWidth="0.8"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Clean Footer: ONLY pg. 01 */}
              <div className="pt-1.5 border-t border-blush flex justify-end text-[10px] font-mono text-dustyRose">
                <span>pg. 01</span>
              </div>
            </div>
          </div>
        </div>
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
              Click the book to step inside
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
