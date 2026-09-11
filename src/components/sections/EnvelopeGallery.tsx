"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Camera, ZoomIn, X, Heart } from "lucide-react";

interface PhotoItem {
  id: number;
  title: string;
  tag: string;
  date: string;
  src: string;
  tilt: string;
  offset: string; // Tailwind placement
  aspect: string;
}

export default function EnvelopeGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const photosContainerRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  // Curated photo collection representing developer life, creativity, university & passions
  const photos: PhotoItem[] = [
    {
      id: 1,
      title: "Deep Focus Coding",
      tag: "Development",
      date: "Autumn 2025",
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      tilt: "-rotate-6",
      offset: "translate-x-0 -translate-y-8",
      aspect: "aspect-[4/5]",
    },
    {
      id: 2,
      title: "Campus & Architecture",
      tag: "Academics",
      date: "BMSCE Life",
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      tilt: "rotate-8",
      offset: "translate-x-12 sm:translate-x-24 translate-y-12",
      aspect: "aspect-[4/3]",
    },
    {
      id: 3,
      title: "Late Night Problem Solving",
      tag: "Engineering",
      date: "Algorithm Sprints",
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      tilt: "-rotate-3",
      offset: "translate-x-28 sm:translate-x-52 -translate-y-16",
      aspect: "aspect-square",
    },
    {
      id: 4,
      title: "Creative Sketches & Art",
      tag: "Personal Passions",
      date: "Studio Notebook",
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
      tilt: "rotate-12",
      offset: "translate-x-44 sm:translate-x-80 translate-y-8",
      aspect: "aspect-[4/5]",
    },
    {
      id: 5,
      title: "Tech Conference & Hackathon",
      tag: "Community",
      date: "Winter 2025",
      src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      tilt: "-rotate-8",
      offset: "translate-x-60 sm:translate-x-[28rem] -translate-y-6",
      aspect: "aspect-[4/3]",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Envelope Entrance (settles at an angled perspective)
      gsap.fromTo(
        envelopeRef.current,
        {
          x: -120,
          opacity: 0,
          rotationY: 45,
          rotationX: 15,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 22,
          rotationX: 8,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Photos spill and fan out to the right
      const cards = photosContainerRef.current?.querySelectorAll(".polaroid-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            x: -150,
            y: 40,
            scale: 0.5,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 1.3,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="envelope"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 bg-cream overflow-hidden flex flex-col justify-center border-b border-blush"
    >
      {/* Section Header: Matching Section 2 Style */}
      <div className="absolute top-8 sm:top-10 left-8 sm:left-14 flex items-center space-x-2 text-xs font-mono text-dustyRose uppercase tracking-widest z-20">
        <span className="w-2 h-2 rounded-full bg-burgundy" />
        <span>SEC. 03 &bull; MEMORY ENVELOPE</span>
      </div>

      <div className="absolute top-8 sm:top-10 right-8 sm:right-14 hidden sm:flex items-center space-x-2 text-xs font-mono text-mauve z-20">
        <Sparkles className="w-3.5 h-3.5 text-dustyRose" />
        <span>Tap any Polaroid to enlarge</span>
      </div>

      {/* Main Composition: LEFT Envelope -> RIGHT Images Spilling */}
      <div className="max-w-7xl mx-auto w-full relative min-h-[580px] sm:min-h-[640px] flex items-center">
        
        {/* ========================================================================= */}
        {/* LEFT: PHYSICAL ENVELOPE (ANGLED / SIDE PERSPECTIVE)                       */}
        {/* ========================================================================= */}
        <div
          ref={envelopeRef}
          style={{ transformStyle: "preserve-3d" }}
          className="relative z-20 w-[240px] sm:w-[320px] md:w-[360px] h-[340px] sm:h-[420px] flex-shrink-0 cursor-default select-none -translate-y-4"
        >
          {/* 3D Envelope Container */}
          <div className="relative w-full h-full bg-[#f2d8dc] rounded-2xl border-2 border-dustyRose/60 shadow-[-25px_30px_60px_rgba(38,28,30,0.25)] flex flex-col justify-between overflow-hidden p-6">
            {/* Vintage Postal Airmail Stripe Accent */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#651F35,#651F35_10px,#FFF8F0_10px,#FFF8F0_20px,#C96F82_20px,#C96F82_30px,#FFF8F0_30px,#FFF8F0_40px)] opacity-70" />

            {/* Open Top Flap / Pocket Illusion */}
            <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#e3bcc2] to-transparent clip-path-envelope pointer-events-none opacity-90" />

            {/* Inner Pocket Depth Shadow (where photos emerge) */}
            <div className="absolute right-0 top-12 bottom-12 w-20 bg-gradient-to-l from-espresso/20 to-transparent pointer-events-none" />

            {/* Stamp & Seal on the Envelope Front */}
            <div className="flex justify-between items-start pt-4">
              <div className="w-14 h-16 border border-dashed border-burgundy/40 rounded p-1 bg-white/60 flex flex-col items-center justify-between text-center">
                <span className="text-[7px] font-mono uppercase text-mauve">POSTAGE</span>
                <span className="font-serif font-bold text-burgundy text-sm">KP</span>
                <span className="text-[7px] font-mono text-dustyRose">2026</span>
              </div>

              {/* Burgundy Wax Seal Monogram */}
              <div className="w-12 h-12 rounded-full bg-burgundy shadow-md border-2 border-burgundy-light flex items-center justify-center text-blush font-serif font-bold text-lg">
                K
              </div>
            </div>

            {/* Handwritten Address Field on Envelope */}
            <div className="my-auto space-y-1.5 pl-2 font-serif">
              <span className="text-[11px] font-mono uppercase tracking-widest text-burgundy/80 block">
                DELIVER TO:
              </span>
              <p className="text-xl sm:text-2xl text-espresso font-bold italic tracking-wide">
                Kritika Panwar
              </p>
              <p className="text-xs sm:text-sm text-espresso/70 font-sans">
                Portfolio Archive &bull; Memories &amp; Milestones
              </p>
              <p className="text-[11px] font-mono text-dustyRose pt-1">
                Bengaluru, KA &bull; github.com/Kritika-Panwar-151
              </p>
            </div>

            {/* Bottom Tag */}
            <div className="pt-2 border-t border-dustyRose/30 flex justify-between items-center text-[10px] font-mono text-mauve">
              <span>SPECIAL PARCEL</span>
              <span>OPENED &bull; UNSEALED</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: PHOTOS SPILLING OUTWARD TOWARD THE RIGHT                          */}
        {/* ========================================================================= */}
        <div
          ref={photosContainerRef}
          className="relative z-30 flex-1 ml-4 sm:ml-8 h-full flex items-center min-w-0"
        >
          <div className="relative w-full h-[520px] flex items-center">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`polaroid-card absolute ${photo.offset} ${photo.tilt} cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-0 hover:z-50 group`}
                style={{ zIndex: 10 + index }}
              >
                {/* Polaroid Frame */}
                <div className="w-48 sm:w-60 md:w-64 bg-white p-3 pb-5 rounded-md shadow-editorial border border-blush/80 transition-shadow group-hover:shadow-editorial-lg">
                  {/* Decorative Washi Tape strip at top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-blush/80 border-t border-b border-dustyRose/40 opacity-90 transform -rotate-2" />

                  {/* Photo Canvas */}
                  <div className={`relative w-full ${photo.aspect} bg-cream overflow-hidden rounded-sm border border-blush/40`}>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover grayscale-[20%] contrast-[105%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/90 text-burgundy flex items-center justify-center shadow">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="mt-3 flex items-center justify-between">
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

      {/* ========================================================================= */}
      {/* PHOTO LIGHTBOX MODAL                                                      */}
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
              <span className="text-xs font-mono text-mauve">Placeholder photo</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
