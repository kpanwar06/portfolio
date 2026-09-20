"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Sparkles, ZoomIn, X, Heart, RotateCcw, Hand, Move } from "lucide-react";

interface PhotoItem {
  id: number;
  title: string;
  tag: string;
  date: string;
  src: string;
  fallbackSrc?: string;
  aspect: string;
}

export default function EnvelopeGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const draggablesRef = useRef<any[]>([]);
  const highestZRef = useRef<number>(30);
  const isDraggingRef = useRef<boolean>(false);

  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Personal archive photos from public/photos/
  const photos: PhotoItem[] = [
    {
      id: 1,
      title: "Encrypted",
      tag: "Pentagram | Volunteer",
      date: "2025",
      src: "/photos/1.jpeg",
      aspect: "aspect-[4/3]",
    },
    {
      id: 2,
      title: "SEED Business School Festival",
      tag: "SEED Global | Volunteer",
      date: "2025",
      src: "/photos/2.jpeg",
      aspect: "aspect-[4/5]",
    },
    {
      id: 3,
      title: "Cyber Siege",
      tag: "Team Code Locked | Volunteer",
      date: "2025",
      src: "/photos/3.jpeg",
      aspect: "aspect-[4/3]",
    },
    {
      id: 4,
      title: "All is Volt",
      tag: "Pentagram | Volunteer",
      date: "2025",
      src: "/photos/4.jpeg",
      aspect: "aspect-[4/3]",
    },
    {
      id: 5,
      title: "Anveshna-Encipher",
      tag: "Pentagram | Volunteer",
      date: "2025",
      src: "/photos/5.jpeg",
      aspect: "aspect-[4/3]",
    },
    {
      id: 6,
      title: "SEED Business School Festival",
      tag: "SEED Global | Volunteer",
      date: "2026",
      src: "/photos/6.jpeg",
      aspect: "aspect-[4/5]",
    },
    {
      id: 7,
      title: "Math Day",
      tag: "Pentagram | Event Coordinator",
      date: "2026",
      src: "/photos/7.jpeg",
      aspect: "aspect-[4/3]",
    },
    {
      id: 8,
      title: "Utsav - Escape Room",
      tag: "Pentagram | Volunteer",
      date: "2026",
      src: "/photos/8.jpeg",
      aspect: "aspect-[4/3]",
    },
  ];

  // Coordinates when bundled at the open right mouth of the envelope
  const getBundleCoords = (index: number) => {
    return {
      x: 35 + index * 6.5,
      y: (index - 3.5) * 3.5,
      rot: (index - 3.5) * 1.8,
    };
  };

  // Coordinates when spread across the right half of the screen
  const getSpreadCoords = (index: number, total: number) => {
    if (typeof window === "undefined") {
      return { x: 90 + index * 90, y: (index % 2 === 0 ? -28 : 28), rot: (index % 2 === 0 ? -4 : 4) };
    }

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Mobile staggered layout within screen bounds
      const col = index % 2;
      const row = Math.floor(index / 2);
      return {
        x: col === 0 ? 25 : 135,
        y: (row - 1.5) * 70 + (col === 1 ? 12 : 0),
        rot: (index % 2 === 0 ? -3 : 4),
      };
    }

    // Desktop/Laptop spread layout: distributes cleanly across the right canvas
    const sectionW = sectionRef.current ? sectionRef.current.clientWidth : window.innerWidth;
    const envelopeW = window.innerWidth >= 1024 ? 260 : 230;
    const cardWidth = 180;
    // Usable width on the right of the portrait envelope
    const usableW = Math.max(sectionW - envelopeW - cardWidth - 60, 340);
    const step = usableW / Math.max(total - 1, 1);

    const yOffsets = [-32, 28, -25, 32, -18, 25, -28, 22];
    const rotations = [-5, 5, -4, 5, -3, 4, -5, 3];

    return {
      x: 55 + index * step,
      y: yOffsets[index % yOffsets.length] || 0,
      rot: rotations[index % rotations.length] || 0,
    };
  };

  // Kill existing draggables safely
  const cleanupDraggables = () => {
    draggablesRef.current.forEach((d) => d.kill());
    draggablesRef.current = [];
  };

  // Initialize GSAP Draggable on each card, strictly bounded to sectionRef
  const initDraggables = useCallback(() => {
    cleanupDraggables();

    cardsRef.current.forEach((card) => {
      if (!card || !sectionRef.current) return;

      const [d] = Draggable.create(card, {
        bounds: sectionRef.current,
        edgeResistance: 0.85,
        type: "x,y",
        onPress: function () {
          highestZRef.current += 1;
          gsap.set(this.target, { zIndex: highestZRef.current });
          gsap.to(this.target, {
            scale: 1.05,
            boxShadow: "0 25px 50px -10px rgba(101,31,53,0.3)",
            duration: 0.2,
            ease: "power1.out",
          });
        },
        onDragStart: function () {
          isDraggingRef.current = true;
        },
        onDragEnd: function () {
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 120);
        },
        onRelease: function () {
          gsap.to(this.target, {
            scale: 1,
            boxShadow: "0 10px 25px -5px rgba(38,28,30,0.12)",
            duration: 0.25,
            ease: "power1.out",
          });
        },
      });

      draggablesRef.current.push(d);
    });
  }, []);

  // Action: Spread photos from envelope across the desk
  const spreadPhotos = useCallback(() => {
    setIsSpread(true);
    cleanupDraggables();

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const target = getSpreadCoords(idx, photos.length);
      gsap.to(card, {
        x: target.x,
        y: target.y,
        rotation: target.rot,
        duration: 0.9,
        delay: idx * 0.07,
        ease: "back.out(1.3)",
        onComplete: () => {
          if (idx === photos.length - 1) {
            initDraggables();
          }
        },
      });
    });
  }, [initDraggables, photos.length]);

  // Action: Bundle photos back at the open right mouth of the envelope
  const bundlePhotos = useCallback(() => {
    cleanupDraggables();
    setIsSpread(false);

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const b = getBundleCoords(idx);
      gsap.to(card, {
        x: b.x,
        y: b.y,
        rotation: b.rot,
        duration: 0.75,
        delay: idx * 0.04,
        ease: "power2.inOut",
      });
    });
  }, []);

  // Initial GSAP Setup on Mount
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const ctx = gsap.context(() => {
      // 1. Envelope slides into place from the left
      gsap.fromTo(
        envelopeRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Photos initial bundled entrance
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const b = getBundleCoords(idx);
        gsap.set(card, {
          x: b.x - 60,
          y: b.y,
          rotation: b.rot,
          opacity: 0,
        });

        gsap.to(card, {
          x: b.x,
          opacity: 1,
          duration: 0.8,
          delay: 0.4 + idx * 0.08,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => {
      cleanupDraggables();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="envelope"
      className="relative w-full h-screen min-h-[580px] max-h-screen py-4 sm:py-6 px-4 sm:px-8 bg-cream overflow-hidden flex flex-col justify-between border-b border-blush select-none"
    >
      {/* Section Header: Corner Stamps */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto pt-1 z-30">
        <div className="flex items-center space-x-2 text-xs font-mono text-dustyRose uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-burgundy" />
          <span>SEC. 03 &bull; MEMORY ENVELOPE</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve">
          <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
          <span>
            {isSpread
              ? "✦ Drag photos anywhere in this frame • Tap to enlarge"
              : "✦ Touch envelope or bundle to scatter photos"}
          </span>
        </div>
      </div>

      {/* Main Stage: Artisanal Cream Envelope on the Left -> Photos Spill Out to Right */}
      <div className="max-w-7xl mx-auto w-full relative flex-1 min-h-0 flex items-center my-auto">
        
        {/* ========================================================================= */}
        {/* LEFT: ARTISANAL CREAM COTTON ENVELOPE (PORTRAIT: HEIGHT LONGER THAN WIDTH) */}
        {/* ========================================================================= */}
        <div
          ref={envelopeRef}
          onClick={isSpread ? bundlePhotos : spreadPhotos}
          className="relative z-20 w-[210px] sm:w-[230px] md:w-[245px] h-[320px] sm:h-[350px] md:h-[375px] flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
          title={isSpread ? "Click to bundle photos back" : "Click to spread photos across desk"}
        >
          {/* Back Panel (Inner Lining of Pocket) */}
          <div className="absolute inset-0 bg-[#F5EDE3] rounded-l-2xl border border-r-0 border-[#E8DFC9]/80 shadow-[-15px_20px_40px_rgba(38,28,30,0.12)] overflow-hidden">
            {/* Subtle soft blush pocket shadow gradient on right opening */}
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#E8D7DC]/60 via-[#E8D7DC]/20 to-transparent pointer-events-none" />
          </div>

          {/* Front Envelope Panel: Soft Textured Cream Cotton Rag Paper */}
          <div className="relative z-20 w-full h-full bg-[#FAF7F2] rounded-l-2xl border border-r-0 border-[#E5DDD0] flex flex-col justify-between items-center p-4 sm:p-5 overflow-hidden shadow-xs">
            
            {/* Authentic Folded Paper Crease Grooves */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 240 375"
            >
              {/* Top Triangular Facet Shading */}
              <polygon points="0,0 240,0 120,188" fill="#FAF6F0" fillOpacity="0.45" />
              
              {/* Left Triangular Facet Shading */}
              <polygon points="0,0 120,188 0,375" fill="#F2EAE0" fillOpacity="0.38" />

              {/* Bottom Triangular Facet Shading */}
              <polygon points="0,375 240,375 120,188" fill="#EFE5D8" fillOpacity="0.5" />

              {/* Top-Left to Center Diagonal Crease Groove */}
              <line x1="0" y1="0" x2="120" y2="188" stroke="#D3C5B3" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="1" y1="1" x2="121" y2="189" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.95" />

              {/* Bottom-Left to Center Diagonal Crease Groove */}
              <line x1="0" y1="375" x2="120" y2="188" stroke="#D3C5B3" strokeWidth="1.4" strokeOpacity="0.85" />
              <line x1="1" y1="374" x2="121" y2="187" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.95" />

              {/* Center Crease Seam Intersection */}
              <circle cx="120" cy="188" r="2.5" fill="#D3C5B3" fillOpacity="0.4" />
            </svg>

            {/* Botanical Pink Tulips SVG Artwork (Upper-Center) */}
            <div className="relative z-10 mx-auto mt-6 sm:mt-8 pointer-events-none">
              <svg viewBox="0 0 110 135" className="w-24 h-28 sm:w-28 sm:h-32 filter drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stems */}
                <path d="M55 128 C53 96, 46 68, 46 50" stroke="#6E8B69" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M55 128 C57 102, 64 74, 66 54" stroke="#6E8B69" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M55 128 C55 94, 38 74, 32 60" stroke="#7A9875" strokeWidth="2" strokeLinecap="round" />
                {/* Leaves */}
                <path d="M55 108 C40 90, 33 67, 26 56 C33 74, 45 92, 55 108 Z" fill="#88A682" opacity="0.9" />
                <path d="M55 100 C68 84, 75 64, 80 50 C73 68, 64 86, 55 100 Z" fill="#7A9875" opacity="0.85" />
                {/* Left Tulip Bloom */}
                <path d="M32 60 C24 49, 21 35, 30 26 C37 35, 39 48, 32 60 Z" fill="#E896A6" />
                <path d="M32 60 C37 48, 41 35, 37 24 C30 35, 27 48, 32 60 Z" fill="#D6758A" opacity="0.8" />
                {/* Center Tulip Bloom */}
                <path d="M46 50 C37 39, 37 23, 46 14 C51 25, 53 38, 46 50 Z" fill="#E896A6" />
                <path d="M46 50 C53 38, 58 23, 51 12 C44 23, 42 36, 46 50 Z" fill="#DE7E92" />
                <path d="M46 50 C44 36, 49 25, 53 19 C53 30, 51 41, 46 50 Z" fill="#F4B8C5" opacity="0.9" />
                {/* Right Tulip Bloom */}
                <path d="M66 54 C59 43, 61 30, 70 21 C74 30, 74 43, 66 54 Z" fill="#E896A6" />
                <path d="M66 54 C73 43, 77 30, 72 19 C65 30, 63 43, 66 54 Z" fill="#CF6E83" opacity="0.85" />
              </svg>
            </div>

            {/* Dusty Rose Antique Wax Seal (Rounded Pill with Embossed Bow, centered near crease seam) */}
            <div className="relative z-10 mx-auto mb-8 sm:mb-10 w-14 h-11 sm:w-16 sm:h-12 rounded-xl bg-gradient-to-br from-[#E2A6B3] via-[#D892A0] to-[#B86B7A] shadow-[0_4px_14px_rgba(101,31,53,0.25)] border-2 border-[#EBBCC6] flex items-center justify-center transform group-hover:rotate-3 transition-transform">
              <div className="w-10 h-8 sm:w-12 sm:h-9 rounded-lg border border-[#F6D0D8]/70 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FFFDF9] drop-shadow-xs" fill="currentColor">
                  <path d="M12 11 C10 9, 6 8, 4 10 C2 12, 4 15, 7 14 C9 13.5, 10.5 12, 12 11 Z" opacity="0.9" />
                  <path d="M12 11 C14 9, 18 8, 20 10 C22 12, 20 15, 17 14 C15 13.5, 13.5 12, 12 11 Z" opacity="0.9" />
                  <circle cx="12" cy="11.5" r="2" />
                  <path d="M11 13 L9 19 C8.8 19.5, 9.5 20, 10 19.5 L12 14.5 L14 19.5 C14.5 20, 15.2 19.5, 15 19 L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Triangular Flap Unfolded and Open to the Right (Generous & Prominent) */}
          <div
            className="absolute top-2 -right-[76px] sm:-right-[90px] md:-right-[102px] bottom-2 w-20 sm:w-24 md:w-26 bg-gradient-to-r from-[#FAF7F2] via-[#F4ECE2] to-[#ECE2D4] border-t border-b border-[#DFD5C4] pointer-events-none opacity-98 shadow-md"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              filter: "drop-shadow(6px 6px 14px rgba(38,28,30,0.18))",
            }}
          >
            {/* Crease line at the flap hinge */}
            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[#D4C6B5]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: PHOTOS CONTAINER (BUNDLED AT MOUTH -> SPREAD & DRAGGABLE)          */}
        {/* ========================================================================= */}
        <div className="relative flex-1 h-full min-h-[380px] sm:min-h-[420px] flex items-center min-w-0">
          <div className="relative w-full h-[380px] sm:h-[420px] flex items-center">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => {
                  if (!isDraggingRef.current) {
                    if (!isSpread) {
                      spreadPhotos();
                    } else {
                      setActivePhoto(photo);
                    }
                  }
                }}
                style={{ zIndex: 10 + index }}
                className="polaroid-card absolute left-0 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-shadow group"
              >
                {/* Polaroid Frame: Thick Cream Cardstock with Soft Washi Tape */}
                <div className="w-40 sm:w-44 md:w-48 bg-[#FFFDF9] p-2 sm:p-2.5 pb-3.5 sm:pb-4 rounded shadow-editorial border border-[#EADBDE]/80 transition-all duration-300 group-hover:shadow-editorial-lg group-hover:border-dustyRose/50">
                  {/* Translucent Soft Blush Washi Tape strip at top */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#EAD5D8]/85 border-y border-[#C96F82]/30 opacity-90 transform -rotate-2 pointer-events-none shadow-2xs" />

                  {/* Photo Canvas */}
                  <div className={`relative w-full ${photo.aspect} bg-[#FAF5F0] overflow-hidden rounded-xs border border-[#EADBDE]/50 pointer-events-none`}>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale-[10%] contrast-[105%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      draggable={false}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (photo.fallbackSrc && target.src !== photo.fallbackSrc) {
                          target.src = photo.fallbackSrc;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-white/90 text-burgundy flex items-center justify-center shadow">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="mt-2.5 flex items-center justify-between pointer-events-none">
                    <div className="min-w-0 pr-1">
                      <p className="text-[8.5px] font-mono uppercase tracking-wider text-dustyRose font-medium truncate">
                        {photo.tag} • {photo.date}
                      </p>
                      <h4 className="font-serif text-espresso font-bold text-xs sm:text-[13px] leading-tight mt-0.5 truncate">
                        {photo.title}
                      </h4>
                    </div>
                    <Heart className="w-3.5 h-3.5 text-dustyRose opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="flex justify-center items-center pb-2 z-30">
        <button
          onClick={isSpread ? bundlePhotos : spreadPhotos}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-burgundy border border-dustyRose/40 text-xs font-mono tracking-wider uppercase shadow-sm transition-all hover:shadow hover:scale-105"
        >
          {isSpread ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Bundle Photos Back</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
              <span>Tap to Spread Photos</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PHOTO LIGHTBOX MODAL (ON TAP / ZOOM)                                      */}
      {/* ========================================================================= */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#FFFDF9] p-4 sm:p-6 pb-8 rounded-xl shadow-2xl max-w-xl w-full border-2 border-blush transform animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream hover:bg-blush text-espresso flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full max-h-[70vh] overflow-hidden rounded border border-blush/60">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-auto max-h-[70vh] object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (activePhoto.fallbackSrc && target.src !== activePhoto.fallbackSrc) {
                    target.src = activePhoto.fallbackSrc;
                  }
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-burgundy tracking-wider">
                  {activePhoto.tag} • {activePhoto.date}
                </span>
                <h3 className="font-serif text-2xl text-espresso font-bold mt-1">
                  {activePhoto.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-mauve">✦ Drag &amp; drop desk item</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
