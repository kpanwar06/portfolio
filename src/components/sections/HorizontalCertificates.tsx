"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  X,
  ExternalLink,
  Award,
  Zap,
} from "lucide-react";

interface HorizontalCertItem {
  id: number;
  title: string;
  organization: string;
  year: string;
  badge: string;
  badgeType: "hackathon" | "workshop" | "competition";
  honors?: string;
  image?: string;
  pdfUrl?: string;
  description: string;
  skills: string[];
  isSpecialFinalCard?: boolean;
}

export default function HorizontalCertificates() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [selectedCert, setSelectedCert] = useState<HorizontalCertItem | null>(null);

  // 7 Authentic Hackathon & Workshop Credentials + 1 Special Final Card from user design
  const items: HorizontalCertItem[] = [
    {
      id: 1,
      title: "Code2Create Hackathon",
      organization: "ACM India & Regional Student Chapters (RIT, BMSCE, NITK, RVCE)",
      year: "May 2026",
      badge: "ACM Hackathon",
      badgeType: "hackathon",
      honors: "Special Mention & Outstanding Project (Team Diamonds)",
      image: "/horizontal-certificates/26_Code2CreateHackathon.png",
      description:
        "Regional innovation hackathon funded by ACM India. Demonstrated exceptional coding skills and innovative thinking, earning a special mention and 20 Activity Points.",
      skills: ["ACM India", "Hackathon", "Rapid Prototyping", "Full Stack"],
    },
    {
      id: 2,
      title: "WeForShe <hacker-ramp/>",
      organization: "Myntra for Bharat (SheCommerce)",
      year: "Sep 2026",
      badge: "Myntra Assessment",
      badgeType: "competition",
      honors: "Fashion-Tech Assessment Qualifier (Team Diamonds)",
      image: "/horizontal-certificates/26_WeForSheHackerRamp.jpg",
      description:
        "National talent initiative by Myntra empowering women in technology to build the next generation of fashion-tech e-commerce systems.",
      skills: ["Myntra", "Fashion-Tech", "E-Commerce", "Algorithmic Problem Solving"],
    },
    {
      id: 3,
      title: "DECODE SIH 2026",
      organization: "OSCode & Google for Developers / Major League Hacking (MLH)",
      year: "2026",
      badge: "National Hackathon",
      badgeType: "hackathon",
      honors: "Smart India Hackathon Initiative",
      image: "/horizontal-certificates/26_DecodeSih.png",
      pdfUrl: "/horizontal-certificates/26_DecodeSih.pdf",
      description:
        "DECODE Smart India Hackathon preparatory hackathon supported by Google for Developers, Major League Hacking, n8n, and Render.",
      skills: ["Smart India Hackathon", "Google for Developers", "MLH", "Innovation"],
    },
    {
      id: 4,
      title: "Mega Hackathon",
      organization: "B.M.S. College of Engineering (Protocol Club & Team Codelocked)",
      year: "March 2026",
      badge: "BMSCE Hackathon",
      badgeType: "hackathon",
      honors: "48-Hour Sprint Participant",
      image: "/horizontal-certificates/26_MegaHackathon.png",
      pdfUrl: "/horizontal-certificates/26_MegaHackathon.pdf",
      description:
        "Intensive engineering hackathon hosted by Protocol Club in collaboration with Team Codelocked, Department of Computer Science & Engineering.",
      skills: ["Systems Engineering", "Team Collaboration", "Problem Solving"],
    },
    {
      id: 5,
      title: "Pixel Pitch",
      organization: "Code I/O Club & Dept. of CSE, BMSCE",
      year: "Nov 2025",
      badge: "Technical Pitch",
      badgeType: "competition",
      honors: "UI/UX & Architecture Presentation",
      image: "/horizontal-certificates/25_KritikaPanwar_PixelPitch.png",
      pdfUrl: "/horizontal-certificates/25_KritikaPanwar_PixelPitch.pdf",
      description:
        "Technical idea pitching and interactive software architecture showcase organized by Code I/O Club, BMS College of Engineering.",
      skills: ["Product Pitching", "System Architecture", "CSE Dept BMSCE"],
    },
    {
      id: 6,
      title: "COMMIT-ED",
      organization: "BMSCE IEEE & Protocol Club",
      year: "2026",
      badge: "IEEE Workshop",
      badgeType: "workshop",
      honors: "Enthusiastic Contribution Award",
      image: "/horizontal-certificates/26_Comited.png",
      pdfUrl: "/horizontal-certificates/26_Comited.pdf",
      description:
        "Hands-on open source and software repository workshop organized by BMSCE IEEE Student Branch and Protocol Club.",
      skills: ["IEEE", "Open Source", "Version Workflows", "Protocol Club"],
    },
    {
      id: 7,
      title: "GIT CLONE PUSH Workshop",
      organization: "BMSCE IEEE & Protocol Club",
      year: "2026",
      badge: "IEEE Workshop",
      badgeType: "workshop",
      honors: "Hands-on Technical Completion",
      image: "/horizontal-certificates/26_GitClonePush.png",
      pdfUrl: "/horizontal-certificates/26_GitClonePush.pdf",
      description:
        "Applied version control, repository maintenance, collaborative branching, and release operations workshop by BMSCE IEEE.",
      skills: ["Git Clone", "Git Push", "Branch Management", "BMSCE IEEE"],
    },
    // The special 8th card from user screenshot
    {
      id: 8,
      title: "Always Learning & Exploring.",
      organization: "Continuous Growth",
      year: "2026",
      badge: "Next Chapter",
      badgeType: "competition",
      skills: [],
      description:
        "Every workshop and challenge expands the developer toolkit. Next up: Personal Journey Path!",
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

    const timer = setTimeout(() => {
      const singleSetWidth = track.scrollWidth / 3;
      track.scrollLeft = singleSetWidth;
    }, 60);

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
    const walk = (x - startX) * 1.5;
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
    const step = 320;
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
      className="relative w-full py-6 sm:py-7 bg-[#FAF6F0] border-b border-blush overflow-hidden select-none"
    >
      {/* Subtle background grain & warm styling */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(rgba(101,31,53,0.06)_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Floating Arrow Left (Click to roll left) */}
      <button
        onClick={() => scrollStep("left")}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/95 backdrop-blur-md border border-dustyRose/40 text-burgundy flex items-center justify-center shadow-md hover:bg-burgundy hover:text-white transition-all active:scale-90 cursor-pointer"
        aria-label="Roll certificates left"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Floating Arrow Right (Click to roll right) */}
      <button
        onClick={() => scrollStep("right")}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-cream/95 backdrop-blur-md border border-dustyRose/40 text-burgundy flex items-center justify-center shadow-md hover:bg-burgundy hover:text-white transition-all active:scale-90 cursor-pointer"
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
          // Special 8th card matching user's design
          if (item.isSpecialFinalCard) {
            return (
              <div
                key={`special-${idx}`}
                onClick={handleScrollToJourney}
                className="w-[280px] sm:w-[310px] h-[195px] sm:h-[210px] flex-shrink-0 bg-[#5A1A2E] text-[#FFF6F8] rounded-xl p-5 border border-burgundy shadow-md flex flex-col justify-between select-none relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl sm:text-[23px] font-serif font-bold text-[#FFF6F8] leading-tight tracking-tight">
                    Always Learning &amp; Exploring.
                  </h3>
                  <p className="text-xs font-sans text-[#F3D7DF]/90 leading-relaxed mt-2.5">
                    Every workshop and challenge expands the developer toolkit. Next up: Personal Journey Path!
                  </p>
                </div>

                <div className="pt-2.5 border-t border-rose-200/20 flex items-center justify-between text-xs font-sans text-[#F3D7DF]/85 group-hover:text-white transition-colors">
                  <span className="font-medium tracking-wide">Scroll down to continue</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          }

          // Regular Hackathon & Workshop Card
          return (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedCert(item)}
              className="w-[280px] sm:w-[310px] h-[195px] sm:h-[210px] flex-shrink-0 bg-[#FFFDF9] rounded-xl p-4 border border-dustyRose/30 shadow-xs hover:shadow-md hover:border-burgundy/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between select-none relative group cursor-pointer"
            >
              {/* Card Header: Badge + Year */}
              <div className="flex items-center justify-between pb-1.5 border-b border-blush/80">
                <span
                  className={`text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                    item.badgeType === "hackathon"
                      ? "bg-purple-50 text-purple-900 border border-purple-200"
                      : item.badgeType === "competition"
                      ? "bg-rose-50 text-rose-900 border border-rose-200"
                      : "bg-blush text-burgundy border border-dustyRose/30"
                  }`}
                >
                  {item.badge}
                </span>
                <span className="text-[10px] font-mono text-mauve font-semibold">
                  {item.year}
                </span>
              </div>

              {/* Card Middle: Title + Organization + Honors */}
              <div className="my-auto py-1">
                <h4 className="font-serif text-sm sm:text-[15px] font-bold text-espresso leading-snug line-clamp-2 group-hover:text-burgundy transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10.5px] font-mono text-mauve-dark italic truncate mt-0.5">
                  {item.organization}
                </p>
                {item.honors && (
                  <span className="inline-block mt-1 text-[8px] font-mono font-bold text-burgundy bg-amber-50/90 px-1.5 py-0.5 rounded border border-amber-200 line-clamp-1">
                    &bull; {item.honors}
                  </span>
                )}
              </div>

              {/* Card Footer: Skills pills + Zoom Hint */}
              <div className="pt-2 border-t border-blush/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1 max-w-[82%]">
                  {item.skills.slice(0, 2).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[7.5px] font-mono px-1.5 py-0.2 bg-cream text-espresso/80 rounded border border-blush truncate"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <span className="text-[9px] font-mono text-burgundy flex items-center space-x-0.5 opacity-80 group-hover:opacity-100 font-semibold">
                  <span>View</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL WITH FLUID TWO-FINGER SCROLL                                */}
      {/* ========================================================================= */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-sm overflow-y-auto overscroll-contain p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          style={{ touchAction: "pan-y" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] p-5 sm:p-7 rounded-xl shadow-2xl max-w-2xl w-full border-4 border-burgundy relative animate-in zoom-in-95 duration-200 my-auto max-h-[88vh] overflow-y-auto overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-blush text-burgundy flex items-center justify-center hover:bg-dustyRose hover:text-white transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center space-x-2 text-burgundy text-xs font-mono uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>{selectedCert.badge} &bull; {selectedCert.year}</span>
            </div>

            {/* Title & Organization */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-espresso mt-1 leading-tight">
              {selectedCert.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-mauve mt-0.5">
              Issued by <span className="font-semibold text-burgundy">{selectedCert.organization}</span>
            </p>

            {/* Honors Banner */}
            {selectedCert.honors && (
              <div className="mt-3 p-2.5 rounded-md bg-amber-50 border border-amber-200 text-amber-950 text-xs font-mono flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 flex-shrink-0" />
                <span className="font-bold">{selectedCert.honors}</span>
              </div>
            )}

            {/* Certificate Image Preview */}
            {selectedCert.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-blush shadow-inner bg-cream/50 relative">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[340px] object-contain mx-auto pointer-events-none select-none"
                />
              </div>
            )}

            {/* Description */}
            <p className="text-xs font-serif italic text-espresso/85 mt-3 leading-relaxed">
              {selectedCert.description}
            </p>

            {/* Verified Skills */}
            <div className="my-3 pt-3 border-t border-blush">
              <span className="text-mauve block text-[10px] uppercase font-semibold tracking-wider font-mono">
                ASSOCIATED SKILLS &amp; COMPETENCIES
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1 font-mono">
                {selectedCert.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-blush/60 rounded border border-dustyRose/30 text-espresso text-[11px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-blush">
              <span className="text-xs font-mono text-mauve">
                Participant: <strong className="text-espresso">Kritika Panwar</strong>
              </span>

              {selectedCert.pdfUrl && (
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-burgundy hover:bg-burgundy-light text-cream rounded-md text-xs font-mono font-semibold transition-colors shadow-xs"
                >
                  <span>View Original PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
