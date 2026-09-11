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
      x: index * 12,
      y: (index - 2) * 6,
      rot: (index - 2) * 3,
    };
  };

  // Coordinates when spread across the right half of the screen
  const getSpreadCoords = (index: number, total: number) => {
    if (typeof window === "undefined") {
      return { x: 180 + index * 160, y: (index % 2 === 0 ? -60 : 60), rot: (index % 2 === 0 ? -6 : 6) };
    }

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Mobile staggered layout
      const col = index % 2;
      const row = Math.floor(index / 2);
      return {
        x: col === 0 ? 30 : 160,
        y: (row - 1) * 120 + (col === 1 ? 25 : 0),
        rot: (index % 2 === 0 ? -4 : 6),
      };
    }

    // Desktop/Laptop spread layout: distributes across the right canvas
    const sectionW = sectionRef.current ? sectionRef.current.clientWidth : window.innerWidth;
    const envelopeW = window.innerWidth >= 1024 ? 380 : 320;
    const availableW = Math.max(sectionW - envelopeW - 240, 480);
    const step = availableW / (total - 0.5);

    const yOffsets = [-85, 75, -80, 85, -50];
    const rotations = [-7, 6, -4, 8, -5];

    return {
      x: 100 + index * step,
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
            boxShadow: "0 30px 60px -12px rgba(101,31,53,0.35)",
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
            boxShadow: "0 10px 25px -5px rgba(38,28,30,0.15)",
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
      className="relative w-full min-h-screen py-20 px-4 sm:px-8 bg-cream overflow-hidden flex flex-col justify-center border-b border-blush select-none"
    >
      {/* Section Header: Corner Stamps */}
      <div className="absolute top-8 sm:top-10 left-8 sm:left-14 flex items-center space-x-2 text-xs font-mono text-dustyRose uppercase tracking-widest z-30">
        <span className="w-2 h-2 rounded-full bg-burgundy" />
        <span>SEC. 03 &bull; MEMORY ENVELOPE</span>
      </div>

      <div className="absolute top-8 sm:top-10 right-8 sm:right-14 hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve z-30">
        <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
        <span>
          {isSpread
            ? "✦ Drag photos anywhere in this frame • Tap to enlarge"
            : "✦ Touch bundle or envelope to scatter photos"}
        </span>
      </div>

      {/* Main Stage: Right-Facing Envelope on the Left -> Photos Spill Out to Right */}
      <div className="max-w-7xl mx-auto w-full relative min-h-[580px] sm:min-h-[640px] flex items-center my-auto">
        
        {/* ========================================================================= */}
        {/* LEFT: PHYSICAL HORIZONTAL ENVELOPE WITH OPEN MOUTH FACING RIGHT           */}
        {/* ========================================================================= */}
        <div
          ref={envelopeRef}
          onClick={isSpread ? bundlePhotos : spreadPhotos}
          className="relative z-20 w-[270px] sm:w-[330px] md:w-[370px] h-[330px] sm:h-[370px] md:h-[390px] flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
          title={isSpread ? "Click to bundle photos back" : "Click to spread photos across desk"}
        >
          {/* Back Panel (Inner Lining of Pocket) */}
          <div className="absolute inset-0 bg-[#e8c0c7] rounded-l-2xl border-2 border-r-0 border-dustyRose/60 shadow-[-20px_25px_50px_rgba(38,28,30,0.2)] overflow-hidden">
            {/* Dark pocket shadow gradient on right opening */}
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-espresso/35 via-espresso/15 to-transparent pointer-events-none" />
          </div>

          {/* Front Envelope Panel */}
          <div className="relative z-20 w-full h-full bg-[#f4dbe0] rounded-l-2xl border-2 border-r-0 border-dustyRose/70 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-sm">
            {/* Airmail Piping Accent along Top, Left, and Bottom */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-[repeating-linear-gradient(45deg,#651F35,#651F35_10px,#FFF8F0_10px,#FFF8F0_20px,#C96F82_20px,#C96F82_30px,#FFF8F0_30px,#FFF8F0_40px)] opacity-75" />
            <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-[repeating-linear-gradient(45deg,#651F35,#651F35_10px,#FFF8F0_10px,#FFF8F0_20px,#C96F82_20px,#C96F82_30px,#FFF8F0_30px,#FFF8F0_40px)] opacity-75" />
            <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-[repeating-linear-gradient(45deg,#651F35,#651F35_10px,#FFF8F0_10px,#FFF8F0_20px,#C96F82_20px,#C96F82_30px,#FFF8F0_30px,#FFF8F0_40px)] opacity-75" />

            {/* Open Right Flap Cutout Notch */}
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-16 bg-cream/30 rounded-l-full border-l border-dustyRose/50 pointer-events-none" />

            {/* Postage Stamp & Monogram Seal Row */}
            <div className="flex justify-between items-start pt-3 pr-2">
              {/* Postage Stamp */}
              <div className="w-14 h-16 border border-dashed border-burgundy/40 rounded p-1 bg-white/70 flex flex-col items-center justify-between text-center shadow-xs">
                <span className="text-[7px] font-mono uppercase text-mauve">POSTAGE</span>
                <span className="font-serif font-bold text-burgundy text-sm">KP</span>
                <span className="text-[7px] font-mono text-dustyRose">2026</span>
              </div>

              {/* Burgundy Wax Seal */}
              <div className="w-11 h-11 rounded-full bg-burgundy shadow-md border-2 border-burgundy-light flex items-center justify-center text-blush font-serif font-bold text-base transform group-hover:rotate-12 transition-transform">
                K
              </div>
            </div>

            {/* Handwritten Delivery Address Field */}
            <div className="my-auto space-y-1 pl-1 font-serif pr-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-burgundy/80 block font-semibold">
                DELIVER TO:
              </span>
              <p className="text-xl sm:text-2xl text-espresso font-bold italic tracking-wide">
                Kritika Panwar
              </p>
              <p className="text-xs text-espresso/75 font-sans">
                Portfolio Archive &bull; Memories &amp; Milestones
              </p>
              <p className="text-[10px] font-mono text-dustyRose pt-0.5">
                Bengaluru, KA &bull; github.com/Kritika-Panwar-151
              </p>
            </div>

            {/* Bottom Status / Toggle Strip */}
            <div className="pt-2 border-t border-dustyRose/30 flex justify-between items-center text-[10px] font-mono text-mauve">
              <span className="text-burgundy font-semibold">
                {isSpread ? "OPENED &bull; SCATTERED" : "OPENED &bull; BUNDLED"}
              </span>
              <span className="text-dustyRose-dark group-hover:underline">
                {isSpread ? "Click to bundle ↺" : "Click to open ✦"}
              </span>
            </div>
          </div>

          {/* Angled Open Right Flap Visual (Pointing outward to the right) */}
          <div
            className="absolute top-4 -right-8 bottom-4 w-10 bg-gradient-to-r from-[#e3bcc2] to-transparent border-t-2 border-b-2 border-dustyRose/40 pointer-events-none opacity-80"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: PHOTOS CONTAINER (BUNDLED AT MOUTH -> SPREAD & DRAGGABLE)          */}
        {/* ========================================================================= */}
        <div className="relative flex-1 h-full min-h-[500px] flex items-center min-w-0">
          <div className="relative w-full h-[520px] flex items-center">
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
                {/* Polaroid Frame */}
                <div className="w-48 sm:w-56 md:w-60 bg-white p-3 pb-5 rounded-md shadow-editorial border border-blush/80 transition-all duration-300 group-hover:shadow-editorial-lg group-hover:border-dustyRose/50">
                  {/* Translucent Washi Tape strip at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-blush/80 border-t border-b border-dustyRose/40 opacity-90 transform -rotate-2 pointer-events-none" />

                  {/* Photo Canvas */}
                  <div className={`relative w-full ${photo.aspect} bg-cream overflow-hidden rounded-sm border border-blush/40 pointer-events-none`}>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale-[15%] contrast-[105%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-burgundy flex items-center justify-center shadow">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="mt-3 flex items-center justify-between pointer-events-none">
                    <div>
                      <h4 className="font-serif italic text-espresso font-semibold text-sm leading-tight">
                        {photo.title}
                      </h4>
                      <p className="text-[10px] font-mono text-mauve mt-0.5">
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
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        <button
          onClick={isSpread ? bundlePhotos : spreadPhotos}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-burgundy border border-dustyRose/40 text-xs font-mono tracking-wider uppercase shadow-sm transition-all hover:shadow hover:scale-105"
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
            className="relative bg-white p-4 sm:p-6 pb-8 rounded-lg shadow-2xl max-w-xl w-full border-2 border-blush transform animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream hover:bg-blush text-espresso flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full max-h-[70vh] overflow-hidden rounded border border-blush">
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
