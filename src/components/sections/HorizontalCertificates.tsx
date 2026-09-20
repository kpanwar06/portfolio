"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface RollItem {
  id: number;
  title: string;
  organization: string;
  year: string;
  badge: string;
  skills: string[];
  honors?: string;
  isSpecialFinalCard?: boolean;
}

export default function HorizontalCertificates() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // 11 Core Certificates + 1 Special Final Card from user design
  const items: RollItem[] = [
    {
      id: 1,
      title: "Ethics in Engineering Practice",
      organization: "NPTEL & IIT Kharagpur",
      year: "2026",
      badge: "Govt. of India",
      honors: "Elite + Top 2% Topper (88%)",
      skills: ["Engineering Ethics", "Standards", "Governance"],
    },
    {
      id: 2,
      title: "Django Web Framework",
      organization: "Meta & Coursera",
      year: "2024",
      badge: "Meta Certified",
      skills: ["Python", "Django", "ORM", "REST APIs"],
    },
    {
      id: 3,
      title: "Programming in Python",
      organization: "Meta & Coursera",
      year: "2024",
      badge: "Meta Certified",
      skills: ["Python 3", "Data Structures", "OOP", "Algorithms"],
    },
    {
      id: 4,
      title: "Databases for Back-End",
      organization: "Meta & Coursera",
      year: "2024",
      badge: "Meta Certified",
      skills: ["MySQL", "Relational DB", "SQL Queries"],
    },
    {
      id: 5,
      title: "Red Hat System Admin I (RH124)",
      organization: "Red Hat, Inc.",
      year: "2025",
      badge: "Enterprise Training",
      honors: "40 Credit Hours",
      skills: ["Linux SysAdmin", "CLI", "Storage & Users"],
    },
    {
      id: 6,
      title: "Getting Started with Linux (RH104)",
      organization: "Red Hat, Inc.",
      year: "2025",
      badge: "Enterprise Training",
      honors: "16 Credit Hours",
      skills: ["Linux Fundamentals", "Permissions", "Bash"],
    },
    {
      id: 7,
      title: "Introduction to Back-End Dev",
      organization: "Meta & Coursera",
      year: "2024",
      badge: "Meta Certified",
      skills: ["Web Architecture", "HTTP Protocols", "APIs"],
    },
    {
      id: 8,
      title: "Version Control with Git",
      organization: "Meta & Coursera",
      year: "2024",
      badge: "Meta Certified",
      skills: ["Git", "GitHub", "Branching", "CI/CD"],
    },
    {
      id: 9,
      title: "Mastering Git",
      organization: "Infosys Springboard",
      year: "2026",
      badge: "Infosys Verified",
      skills: ["Advanced Git", "Rebase", "Repository Workflows"],
    },
    {
      id: 10,
      title: "Project on Git",
      organization: "Infosys Springboard",
      year: "2026",
      badge: "Infosys Verified",
      skills: ["Hands-on Git", "Merge Conflicts", "Collaboration"],
    },
    {
      id: 11,
      title: "TechA Git Foundation",
      organization: "TechA & Infosys Wingspan",
      year: "2026",
      badge: "TechA Verified",
      skills: ["Git Foundations", "Version Tracking", "Source Control"],
    },
    // The special 12th card from user screenshot
    {
      id: 12,
      title: "Always Learning & Exploring.",
      organization: "Continuous Growth",
      year: "2026",
      badge: "Next Milestone",
      skills: [],
      isSpecialFinalCard: true,
    },
  ];

  // Render 3 identical sets to enable seamless infinite wrapping in both directions
  const loopedItems = [...items, ...items, ...items];

  // Helper to maintain seamless infinite wrapping
  const handleScrollWrap = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const singleSetWidth = track.scrollWidth / 3;

    // If user scrolls left near the beginning, jump forward by singleSetWidth
    if (track.scrollLeft <= 20) {
      track.scrollLeft += singleSetWidth;
    }
    // If user scrolls right past the second set, jump back by singleSetWidth
    else if (track.scrollLeft >= singleSetWidth * 2 - 20) {
      track.scrollLeft -= singleSetWidth;
    }
  }, []);

  // Initialize scroll position to the middle set so scrolling left immediately shows the last card
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Small delay to allow CSS layout to settle
    const timer = setTimeout(() => {
      const singleSetWidth = track.scrollWidth / 3;
      track.scrollLeft = singleSetWidth;
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Drag-to-swipe handlers for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    setStartX(e.pageX - track.offsetLeft);
    setScrollLeftState(track.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // Smooth swipe sensitivity
    track.scrollLeft = scrollLeftState - walk;
    handleScrollWrap();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Nav Arrow buttons (one-click smooth scroll)
  const scrollStep = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const step = 340;
    track.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const handleScrollToJourney = (e: React.MouseEvent) => {
    e.stopPropagation();
    const journeyEl = document.getElementById("journey");
    if (journeyEl) {
      journeyEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="workshops"
      className="relative w-full py-7 sm:py-8 bg-[#FBF7F2] border-b border-blush overflow-hidden select-none"
    >
      {/* Subtle background grain & warm styling */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(rgba(101,31,53,0.06)_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Floating Arrow Left (Click to roll left) */}
      <button
        onClick={() => scrollStep("left")}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/90 backdrop-blur-md border border-dustyRose/40 text-burgundy flex items-center justify-center shadow-md hover:bg-burgundy hover:text-white transition-all active:scale-90 cursor-pointer"
        aria-label="Roll certificates left"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Floating Arrow Right (Click to roll right) */}
      <button
        onClick={() => scrollStep("right")}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/90 backdrop-blur-md border border-dustyRose/40 text-burgundy flex items-center justify-center shadow-md hover:bg-burgundy hover:text-white transition-all active:scale-90 cursor-pointer"
        aria-label="Roll certificates right"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* ========================================================================= */}
      {/* HORIZONTAL CONTINUOUS ROLLING CAROUSEL TRACK                              */}
      {/* ========================================================================= */}
      <div
        ref={trackRef}
        onScroll={handleScrollWrap}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex items-center space-x-4 sm:space-x-5 px-6 sm:px-12 overflow-x-auto scrollbar-none relative z-10 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {loopedItems.map((item, idx) => {
          // Special 12th card matching user's design
          if (item.isSpecialFinalCard) {
            return (
              <div
                key={`special-${idx}`}
                onClick={handleScrollToJourney}
                className="w-[280px] sm:w-[310px] h-[190px] sm:h-[205px] flex-shrink-0 bg-[#5A1A2E] text-[#FFF6F8] rounded-xl p-5 border border-burgundy shadow-md flex flex-col justify-between select-none relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl sm:text-[22px] font-serif font-bold text-[#FFF6F8] leading-tight tracking-tight">
                    Always Learning &amp; Exploring.
                  </h3>
                  <p className="text-xs font-sans text-[#F3D7DF]/90 leading-relaxed mt-2 line-clamp-3">
                    Every workshop and challenge expands the developer toolkit. Next up: Personal Journey Path!
                  </p>
                </div>

                <div className="pt-2 border-t border-rose-200/20 flex items-center justify-between text-xs font-sans text-[#F3D7DF]/85 group-hover:text-white transition-colors">
                  <span className="font-medium tracking-wide">Scroll down to continue</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          }

          // Regular Certificate / Workshop Card
          return (
            <div
              key={`${item.id}-${idx}`}
              className="w-[280px] sm:w-[310px] h-[190px] sm:h-[205px] flex-shrink-0 bg-[#FFFDF9] rounded-xl p-4 sm:p-4.5 border border-dustyRose/30 shadow-xs hover:shadow-md hover:border-burgundy/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between select-none relative group"
            >
              {/* Card Header: Organization Badge + Year */}
              <div className="flex items-center justify-between pb-1.5 border-b border-blush/80">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-blush text-burgundy font-bold">
                    {item.badge}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-mauve font-semibold">
                  {item.year}
                </span>
              </div>

              {/* Card Middle: Title + Issuer + Honors */}
              <div className="my-auto py-1">
                <h4 className="font-serif text-sm sm:text-[15px] font-bold text-espresso leading-snug line-clamp-2 group-hover:text-burgundy transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10.5px] font-mono text-mauve-dark italic truncate mt-0.5">
                  {item.organization}
                </p>
                {item.honors && (
                  <span className="inline-block mt-1 text-[8.5px] font-mono font-bold text-burgundy bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                    &bull; {item.honors}
                  </span>
                )}
              </div>

              {/* Card Footer: Skills pills */}
              <div className="pt-2 border-t border-blush/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1 max-w-[85%]">
                  {item.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[8px] font-mono px-1.5 py-0.2 bg-cream text-espresso/80 rounded border border-blush"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <ShieldCheck className="w-3.5 h-3.5 text-burgundy/60 group-hover:text-burgundy transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
