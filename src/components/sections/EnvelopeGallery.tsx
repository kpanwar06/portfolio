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

  // Curated photo collection
  const photos: PhotoItem[] = [
    {
      id: 1,
      title: "Deep Focus Coding",
      tag: "Development",
      date: "Autumn 2025",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/5]",
    },
    {
      id: 2,
      title: "Campus & Architecture",
      tag: "Academics",
      date: "BMSCE Life",
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/3]",
    },
    {
      id: 3,
      title: "Late Night Problem Solving",
      tag: "Engineering",
      date: "Algorithm Sprints",
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-square",
    },
    {
      id: 4,
      title: "Creative Sketches & Art",
      tag: "Personal Passions",
      date: "Studio Notebook",
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/5]",
    },
    {
      id: 5,
      title: "Tech Conference & Hackathon",
      tag: "Community",
      date: "Winter 2025",
      src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/3]",
    },
  ];

  // Coordinates when bundled at the open right mouth of the envelope
  const getBundleCoords = (index: number) => {
    return {
      x: index * 10,
      y: (index - 2) * 5,
      rot: (index - 2) * 2.5,
    };
  };

  // Coordinates when spread across the right half of the screen
  const getSpreadCoords = (index: number, total: number) => {
    if (typeof window === "undefined") {
      return { x: 120 + index * 130, y: (index % 2 === 0 ? -30 : 30), rot: (index % 2 === 0 ? -4 : 5) };
    }

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Mobile staggered layout within screen bounds
      const col = index % 2;
      const row = Math.floor(index / 2);
      return {
        x: col === 0 ? 15 : 130,
        y: (row - 1) * 90 + (col === 1 ? 15 : 0),
        rot: (index % 2 === 0 ? -3 : 4),
      };
    }

    // Desktop/Laptop spread layout: distributes cleanly across the right canvas
    const sectionW = sectionRef.current ? sectionRef.current.clientWidth : window.innerWidth;
    const envelopeW = window.innerWidth >= 1024 ? 330 : 270;
    const cardWidth = 190;
    // Usable width on the right of the envelope
    const usableW = Math.max(sectionW - envelopeW - cardWidth - 60, 260);
    const step = usableW / Math.max(total - 1, 1);

    const yOffsets = [-35, 30, -25, 35, -15];
    const rotations = [-5, 5, -4, 6, -3];

    return {
      x: 35 + index * step,
      y: yOffsets[index] || 0,
      rot: rotations[index] || 0,
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
        {/* LEFT: ARTISANAL CREAM COTTON ENVELOPE (RIGHT-OPENING FLAP)                */}
        {/* ========================================================================= */}
        <div
          ref={envelopeRef}
          onClick={isSpread ? bundlePhotos : spreadPhotos}
          className="relative z-20 w-[260px] sm:w-[300px] md:w-[330px] h-[215px] sm:h-[235px] md:h-[250px] flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
          title={isSpread ? "Click to bundle photos back" : "Click to spread photos across desk"}
        >
          {/* Pale Pink Satin Ribbon Tail peeking from envelope */}
          <div className="absolute -top-3.5 left-10 w-8 h-10 bg-gradient-to-b from-[#F2C4CE] to-[#E5A8B4] rounded-t-sm shadow-xs transform -rotate-12 pointer-events-none opacity-90 border-t border-white" />

          {/* Back Panel (Inner Lining of Pocket) */}
          <div className="absolute inset-0 bg-[#F5EDE3] rounded-l-2xl border border-r-0 border-[#E8DFC9]/80 shadow-[-15px_20px_40px_rgba(38,28,30,0.12)] overflow-hidden">
            {/* Subtle soft blush pocket shadow gradient on right opening */}
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#E8D7DC]/50 via-[#E8D7DC]/15 to-transparent pointer-events-none" />
          </div>

          {/* Front Envelope Panel: Soft Textured Cream Cotton Rag Paper */}
          <div className="relative z-20 w-full h-full bg-[#FAF7F2] rounded-l-2xl border border-r-0 border-[#E5DDD0] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-xs">
            
            {/* Top Row: Hand-painted Tulips Illustration + Blush Wax Seal with Bow */}
            <div className="flex justify-between items-start">
              {/* Botanical Pink Tulips SVG Artwork */}
              <div className="relative -ml-1 -mt-1 pointer-events-none">
                <svg viewBox="0 0 100 120" className="w-16 h-20 sm:w-20 sm:h-24 filter drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stems */}
                  <path d="M50 115 C48 85, 42 60, 42 45" stroke="#6E8B69" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M50 115 C52 90, 56 65, 58 48" stroke="#6E8B69" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M50 115 C50 85, 36 68, 30 55" stroke="#7A9875" strokeWidth="2" strokeLinecap="round" />
                  {/* Leaves */}
                  <path d="M50 95 C38 80, 32 60, 26 50 C32 66, 42 82, 50 95 Z" fill="#88A682" opacity="0.9" />
                  <path d="M50 90 C62 76, 68 58, 72 46 C66 62, 58 78, 50 90 Z" fill="#7A9875" opacity="0.85" />
                  {/* Left Tulip Bloom */}
                  <path d="M30 55 C22 45, 20 32, 28 24 C34 32, 36 44, 30 55 Z" fill="#E896A6" />
                  <path d="M30 55 C34 44, 38 32, 34 22 C28 32, 26 44, 30 55 Z" fill="#D6758A" opacity="0.8" />
                  {/* Center Tulip Bloom */}
                  <path d="M42 45 C34 35, 34 20, 42 12 C46 22, 48 34, 42 45 Z" fill="#E896A6" />
                  <path d="M42 45 C48 34, 52 20, 46 10 C40 20, 38 32, 42 45 Z" fill="#DE7E92" />
                  <path d="M42 45 C40 32, 44 22, 48 16 C48 26, 46 36, 42 45 Z" fill="#F4B8C5" opacity="0.9" />
                  {/* Right Tulip Bloom */}
                  <path d="M58 48 C52 38, 54 26, 62 18 C66 26, 66 38, 58 48 Z" fill="#E896A6" />
                  <path d="M58 48 C64 38, 68 26, 64 16 C58 26, 56 38, 58 48 Z" fill="#CF6E83" opacity="0.85" />
                </svg>
              </div>

              {/* Dusty Rose Wax Seal with Embossed Bow */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#E2A6B3] via-[#D892A0] to-[#B86B7A] shadow-[0_4px_12px_rgba(101,31,53,0.22)] border-2 border-[#EBBCC6] flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                <div className="w-8 h-8 rounded-full border border-[#F6D0D8]/60 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FFFDF9] drop-shadow-xs" fill="currentColor">
                    <path d="M12 11 C10 9, 6 8, 4 10 C2 12, 4 15, 7 14 C9 13.5, 10.5 12, 12 11 Z" opacity="0.9" />
                    <path d="M12 11 C14 9, 18 8, 20 10 C22 12, 20 15, 17 14 C15 13.5, 13.5 12, 12 11 Z" opacity="0.9" />
                    <circle cx="12" cy="11.5" r="2" />
                    <path d="M11 13 L9 19 C8.8 19.5, 9.5 20, 10 19.5 L12 14.5 L14 19.5 C14.5 20, 15.2 19.5, 15 19 L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Handwritten Delivery Address Field */}
            <div className="my-auto pl-1 pr-3 font-serif">
              <span className="text-[9px] font-mono uppercase tracking-widest text-burgundy/75 block font-semibold">
                DELIVER TO:
              </span>
              <p className="text-lg sm:text-xl text-espresso font-bold italic tracking-wide">
                Kritika Panwar
              </p>
              <p className="text-xs text-espresso/70 font-sans">
                Portfolio Archive &bull; Memories &amp; Milestones
              </p>
              <p className="text-[9px] font-mono text-dustyRose pt-0.5">
                Bengaluru, KA &bull; Class of 2028
              </p>
            </div>

            {/* Bottom Status / Toggle Strip */}
            <div className="pt-2 border-t border-[#E8DFC9]/60 flex justify-between items-center text-[9px] font-mono text-mauve">
              <span className="text-burgundy font-semibold">
                {isSpread ? "OPENED &bull; SCATTERED" : "OPENED &bull; BUNDLED"}
              </span>
              <span className="text-dustyRose-dark group-hover:underline">
                {isSpread ? "Click to bundle ↺" : "Click to spread ✦"}
              </span>
            </div>
          </div>

          {/* Triangular Flap Unfolded and Open to the Right */}
          <div
            className="absolute top-2 -right-8 bottom-2 w-10 bg-gradient-to-r from-[#FAF7F2] to-[#F1E8DC] border-t border-b border-[#E5DDD0] pointer-events-none opacity-95 shadow-sm"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />
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
                    />
                    <div className="absolute inset-0 bg-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-white/90 text-burgundy flex items-center justify-center shadow">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="mt-2.5 flex items-center justify-between pointer-events-none">
                    <div>
                      <h4 className="font-serif italic text-espresso font-semibold text-xs leading-tight">
                        {photo.title}
                      </h4>
                      <p className="text-[9px] font-mono text-mauve mt-0.5">
                        {photo.tag} &bull; {photo.date}
                      </p>
                    </div>
                    <Heart className="w-3.5 h-3.5 text-dustyRose opacity-0 group-hover:opacity-100 transition-opacity" />
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
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-burgundy tracking-wider">
                  {activePhoto.tag} &bull; {activePhoto.date}
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
