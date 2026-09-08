"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ExternalLink, Sparkles, CheckCircle2, X } from "lucide-react";

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl?: string;
  skills: string[];
  frameClass: string; // Frame size / aspect
  badgeColor: string;
}

export default function FramedCertifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const framesColRef = useRef<HTMLDivElement>(null);
  const titleColRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // Key primary certifications
  const certificates: CertificateItem[] = [
    {
      id: 1,
      title: "Django Web Framework Specialization",
      issuer: "Coursera & Meta / University",
      date: "2025",
      credentialId: "COURSERA-DJANGO-KP06",
      skills: ["Python", "Django", "ORM", "REST APIs", "PostgreSQL"],
      frameClass: "col-span-2 md:col-span-2 aspect-[4/3]",
      badgeColor: "bg-burgundy text-blush",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms in Python",
      issuer: "Advanced Engineering Program",
      date: "2024",
      credentialId: "DSA-PY-98421",
      skills: ["Graph Theory", "Dynamic Programming", "Trees", "Sorting"],
      frameClass: "col-span-2 sm:col-span-1 aspect-[3/4]",
      badgeColor: "bg-dustyRose text-white",
    },
    {
      id: 3,
      title: "Full-Stack Web Development & Cloud",
      issuer: "Professional Credentials",
      date: "2025",
      credentialId: "FS-DEV-77312",
      skills: ["React", "Node.js", "Docker", "CI/CD"],
      frameClass: "col-span-2 sm:col-span-1 aspect-[3/4]",
      badgeColor: "bg-espresso text-cream",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Frames on the LEFT slide and settle into place
      const frames = framesColRef.current?.querySelectorAll(".physical-frame");
      if (frames && frames.length > 0) {
        gsap.fromTo(
          frames,
          {
            x: -80,
            y: 40,
            opacity: 0,
            rotation: () => gsap.utils.random(-4, 4),
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // 2. Typography on the RIGHT enters with graceful reveal
      gsap.fromTo(
        titleColRef.current,
        {
          x: 80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
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
      id="certifications"
      className="relative w-full min-h-screen py-24 px-4 sm:px-8 md:px-14 bg-cream overflow-hidden flex items-center border-b border-blush"
    >
      {/* Decorative wall texture */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(rgba(101,31,53,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT SIDE: PHYSICAL CERTIFICATE FRAMES                                    */}
        {/* ========================================================================= */}
        <div ref={framesColRef} className="lg:col-span-7 order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`physical-frame ${cert.frameClass} group cursor-pointer transition-all duration-300 hover:-translate-y-2 relative`}
              >
                {/* Physical Picture Frame Outer Border */}
                <div className="w-full h-full p-3 sm:p-4 rounded-lg bg-[#38262a] shadow-[-12px_18px_40px_rgba(38,28,30,0.25)] border-[6px] sm:border-[8px] border-[#291b1e] relative flex flex-col justify-between overflow-hidden">
                  
                  {/* Subtle Glass Reflection Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                  {/* Inner Matting (Passe-partout) */}
                  <div className="w-full h-full bg-[#FFFDF9] rounded-xs p-4 sm:p-6 border border-dustyRose/20 shadow-inner flex flex-col justify-between relative z-10">
                    
                    {/* Certificate Ornate Header */}
                    <div className="flex items-center justify-between border-b border-blush pb-2">
                      <div className="flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-burgundy" />
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-burgundy font-bold">
                          Certificate of Completion
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-mauve">{cert.date}</span>
                    </div>

                    {/* Certificate Body */}
                    <div className="my-auto py-2 text-center">
                      <span className="text-[9px] font-mono text-dustyRose tracking-widest uppercase block">
                        Awarded to Kritika Panwar for
                      </span>
                      <h3 className="font-serif text-base sm:text-xl md:text-2xl text-espresso font-bold mt-1 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-[11px] font-mono text-mauve-dark mt-1 italic">
                        Issued by {cert.issuer}
                      </p>
                    </div>

                    {/* Certificate Seal & Skills */}
                    <div className="pt-2 border-t border-blush flex items-end justify-between">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {cert.skills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-1.5 py-0.5 bg-blush text-burgundy rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Official Gold/Burgundy Stamp */}
                      <div className="w-9 h-9 rounded-full border-2 border-burgundy flex items-center justify-center bg-burgundy/5 text-burgundy text-[8px] font-mono font-bold uppercase shadow-xs">
                        VERIFIED
                      </div>
                    </div>
                  </div>

                  {/* Brass Nameplate at bottom of frame */}
                  <div className="mt-2 py-0.5 px-3 bg-gradient-to-r from-[#d8a47f]/80 via-[#f5d9b5] to-[#d8a47f]/80 rounded text-center shadow-xs border border-[#b88562]">
                    <span className="text-[9px] font-mono text-espresso font-bold uppercase tracking-wider block truncate">
                      {cert.issuer} &bull; {cert.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-mauve px-2">
            <span>* Physical certificate replicas</span>
            <span className="flex items-center space-x-1 text-dustyRose">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click any certificate to inspect details</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: LARGE "CERTIFICATIONS" TYPOGRAPHY                             */}
        {/* ========================================================================= */}
        <div
          ref={titleColRef}
          className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center lg:pl-6"
        >
          {/* Section Marker */}
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-burgundy mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-burgundy" />
            <span>SEC. 04 &bull; ACCREDITATION</span>
          </div>

          {/* Massive Typography Counterpart */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-black text-burgundy uppercase tracking-tight leading-[0.95] select-none">
            CERTIFI-
            <br />
            CATIONS
          </h2>

          <div className="w-20 h-1 bg-dustyRose my-6" />

          <p className="text-base sm:text-lg font-serif italic text-espresso/85 leading-relaxed">
            Rigorous coursework, specialized professional training, and verified engineering certifications in modern software architecture, backend ecosystems, and computer science foundations.
          </p>

          <div className="mt-6 space-y-2 font-mono text-xs text-mauve-dark">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-burgundy" />
              <span>Meta &bull; Coursera Python / Django Credentials</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-burgundy" />
              <span>Computer Science &amp; Algorithms Proficiency</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-burgundy" />
              <span>Full-Stack Engineering Competency</span>
            </div>
          </div>

          {/* Quick link indicator to horizontal workshops */}
          <div className="mt-8 pt-6 border-t border-blush">
            <span className="text-xs font-mono text-dustyRose uppercase tracking-wider block">
              Continuous Learning:
            </span>
            <p className="text-sm font-serif text-espresso mt-1">
              Scroll down for workshops, hackathons &amp; participation credentials &rarr;
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CERTIFICATE DETAIL MODAL                                                  */}
      {/* ========================================================================= */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] p-6 sm:p-8 rounded-xl shadow-2xl max-w-lg w-full border-4 border-burgundy relative"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush text-burgundy flex items-center justify-center hover:bg-dustyRose hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-burgundy text-xs font-mono uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Verified Certificate</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso mt-2">
              {selectedCert.title}
            </h3>
            <p className="text-sm font-mono text-mauve mt-1">
              Issued by {selectedCert.issuer} &bull; {selectedCert.date}
            </p>

            <div className="my-6 p-4 rounded-lg bg-blush/60 border border-dustyRose/40 space-y-2 text-xs font-mono text-espresso">
              <div>
                <span className="text-mauve block">CREDENTIAL ID</span>
                <span className="font-bold text-burgundy">{selectedCert.credentialId}</span>
              </div>
              <div className="pt-2">
                <span className="text-mauve block">VERIFIED SKILLS</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedCert.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white rounded border border-blush text-espresso">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-blush">
              <span className="text-xs font-mono text-mauve">Recipient: Kritika Panwar</span>
              <a
                href="https://github.com/kpanwar06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-burgundy hover:bg-burgundy-light text-cream rounded-md text-xs font-mono font-semibold transition-colors"
              >
                <span>Verify on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
