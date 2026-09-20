"use client";

import React, { useState } from "react";
import {
  Award,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl?: string;
  skills: string[];
  badgeColor?: string;
}

export default function FramedCertifications() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  // 8 Curated Certificates across 2 pages (4 per page in a 2x2 grid)
  const certificates: CertificateItem[] = [
    // Page 1: Frames 1 - 4
    {
      id: 1,
      title: "Django Web Framework Specialization",
      issuer: "Coursera & Meta / University",
      date: "2025",
      credentialId: "COURSERA-DJANGO-KP06",
      skills: ["Python", "Django", "ORM", "REST APIs"],
    },
    {
      id: 2,
      title: "Data Structures & Algorithms in Python",
      issuer: "Advanced Engineering Program",
      date: "2024",
      credentialId: "DSA-PY-98421",
      skills: ["Graph Theory", "Dynamic Prog.", "Trees"],
    },
    {
      id: 3,
      title: "Full-Stack Web Development & Cloud",
      issuer: "Professional Credentials",
      date: "2025",
      credentialId: "FS-DEV-77312",
      skills: ["React", "Node.js", "Docker", "CI/CD"],
    },
    {
      id: 4,
      title: "Relational Database Design & SQL",
      issuer: "Engineering Academy",
      date: "2024",
      credentialId: "SQL-DB-44109",
      skills: ["PostgreSQL", "Indexing", "Optimization"],
    },

    // Page 2: Frames 5 - 8
    {
      id: 5,
      title: "Distributed Data Pipelines with Kafka",
      issuer: "Cloud & Data Summit",
      date: "2025",
      credentialId: "KAFKA-STREAM-2201",
      skills: ["Apache Kafka", "Message Queues", "Streaming"],
    },
    {
      id: 6,
      title: "Git Documentation & Open Source Architecture",
      issuer: "Open Source Initiative",
      date: "2024",
      credentialId: "GIT-COLLAB-3819",
      skills: ["Git", "GitHub Actions", "Markdown", "CI/CD"],
    },
    {
      id: 7,
      title: "InnovateTech 36-Hour Hackathon",
      issuer: "BMSCE Tech Club",
      date: "2025",
      credentialId: "HACK-FINALIST-007",
      skills: ["Rapid Prototyping", "Full Stack", "System Design"],
    },
    {
      id: 8,
      title: "Frontend Systems & UI Architecture",
      issuer: "Meta Professional Series",
      date: "2025",
      credentialId: "META-FRONTEND-8821",
      skills: ["Modern JS", "React 18", "Performance"],
    },
  ];

  const totalPages = Math.ceil(certificates.length / 4);
  const pages = [
    certificates.slice(0, 4),
    certificates.slice(4, 8),
  ];

  // Strictly moves Left (Previous) only if not at the beginning
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Strictly moves Right (Next) only if not at the end
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section
      id="certifications"
      className="relative w-full h-screen max-h-screen py-6 sm:py-8 md:py-10 px-4 sm:px-8 md:px-12 bg-cream overflow-hidden flex items-center border-b border-blush select-none"
    >
      {/* Decorative subtle wall texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(rgba(101,31,53,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 h-full max-h-[640px]">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: STATIC / FIXED TITLE & DETAILS (STAYS COMPLETELY STILL)     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full max-h-[560px] lg:pr-4">
          <div>
            {/* Section Tag */}
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-burgundy mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-burgundy" />
              <span>SEC. 04 &bull; ACCREDITATION</span>
            </div>

            {/* Editorial Title - Fits in One Single Line */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-serif font-black text-burgundy uppercase tracking-wide leading-none select-none whitespace-nowrap">
              CERTIFICATIONS
            </h2>

            <div className="w-16 h-1 bg-dustyRose my-4" />

            <p className="text-xs sm:text-sm font-serif italic text-espresso/85 leading-relaxed max-w-sm">
              Rigorous coursework, specialized professional training, and verified engineering certifications in modern software architecture and systems.
            </p>

            <div className="mt-5 space-y-2 font-mono text-[11px] text-mauve-dark">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>Coursera &bull; Meta Full-Stack Credentials</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>Algorithms &amp; Database Design Mastery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>Hackathon Finalist &amp; Distributed Systems</span>
              </div>
            </div>
          </div>

          {/* Left Column Footer Note */}
          <div className="pt-4 border-t border-blush/60">
            <span className="text-[10px] font-mono text-dustyRose uppercase tracking-wider block font-semibold">
              Continuous Verification:
            </span>
            <p className="text-xs font-serif italic text-espresso/75 mt-0.5">
              Credentials certified and verified across industry benchmarks.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: SLIDING 4-FRAME 2x2 GRID + CONTROLS BELOW                  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full max-h-[580px]">
          {/* Overflow-hidden container for the sliding track */}
          <div className="overflow-hidden relative w-full flex-1 flex items-center">
            {/* Inner sliding track: 1.0s smooth transition */}
            <div
              className="flex w-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((pageGroup, pageIdx) => (
                <div
                  key={pageIdx}
                  className="w-full flex-shrink-0 grid grid-cols-2 gap-3 sm:gap-4 p-1"
                >
                  {pageGroup.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="physical-frame group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 relative h-[180px] sm:h-[195px] md:h-[210px]"
                    >
                      {/* Picture Frame Outer Border */}
                      <div className="w-full h-full p-2 sm:p-2.5 rounded-lg bg-[#38262a] shadow-[-6px_10px_25px_rgba(38,28,30,0.22)] border-[4px] sm:border-[6px] border-[#291b1e] relative flex flex-col justify-between overflow-hidden">
                        {/* Glass Sheen Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                        {/* Inner Matting / Certificate Cardstock */}
                        <div className="w-full h-full bg-[#FFFDF9] rounded-xs p-2.5 sm:p-3 border border-dustyRose/20 shadow-inner flex flex-col justify-between relative z-10">
                          {/* Certificate Header */}
                          <div className="flex items-center justify-between border-b border-blush pb-1">
                            <div className="flex items-center space-x-1">
                              <Award className="w-3 h-3 text-burgundy" />
                              <span className="text-[8px] font-mono tracking-widest uppercase text-burgundy font-bold">
                                CERTIFICATE OF COMPLETION
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-mauve font-semibold">
                              {cert.date}
                            </span>
                          </div>

                          {/* Certificate Body */}
                          <div className="my-auto py-1 text-center">
                            <span className="text-[7.5px] font-mono text-dustyRose tracking-widest uppercase block">
                              AWARDED TO KRITIKA PANWAR FOR
                            </span>
                            <h3 className="font-serif text-xs sm:text-sm font-bold text-espresso mt-0.5 leading-snug line-clamp-2">
                              {cert.title}
                            </h3>
                            <p className="text-[9.5px] font-mono text-mauve-dark italic truncate mt-0.5">
                              Issued by {cert.issuer}
                            </p>
                          </div>

                          {/* Footer: Skills + Stamp */}
                          <div className="pt-1 border-t border-blush flex items-end justify-between">
                            <div className="flex flex-wrap gap-1 max-w-[70%]">
                              {cert.skills.slice(0, 2).map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-[8px] font-mono px-1 py-0.2 bg-blush text-burgundy rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="w-6 h-6 rounded-full border border-burgundy flex items-center justify-center bg-burgundy/5 text-burgundy text-[6.5px] font-mono font-bold uppercase shadow-2xs">
                              VERIFIED
                            </div>
                          </div>
                        </div>

                        {/* Brass Nameplate at Frame Base */}
                        <div className="mt-1 py-0.5 px-2 bg-gradient-to-r from-[#d8a47f]/80 via-[#f5d9b5] to-[#d8a47f]/80 rounded text-center shadow-2xs border border-[#b88562]">
                          <span className="text-[7.5px] font-mono text-espresso font-bold uppercase tracking-wider block truncate">
                            {cert.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SLIDER CONTROLS (PLACED BELOW THE RIGHT COLUMN OF FRAMES)             */}
          {/* ===================================================================== */}
          <div className="mt-3 pt-3 border-t border-blush/60 flex items-center justify-between px-1">
            <div className="flex items-center space-x-3">
              {/* Left Arrow Button (Strictly Moves Left / Back to Page 1) */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-xs active:scale-95 ${
                  currentPage === 0
                    ? "opacity-25 cursor-not-allowed border-mauve/30 text-mauve"
                    : "border-burgundy/50 text-burgundy hover:bg-burgundy hover:text-white cursor-pointer"
                }`}
                title="Previous certificates (Page 1)"
                aria-label="Previous certificates"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Right Arrow Button (Strictly Moves Right / Next to Page 2) */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-xs active:scale-95 ${
                  currentPage === totalPages - 1
                    ? "opacity-25 cursor-not-allowed border-mauve/30 text-mauve"
                    : "border-burgundy/50 text-burgundy hover:bg-burgundy hover:text-white cursor-pointer"
                }`}
                title="Next certificates (Page 2)"
                aria-label="Next certificates"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Page Counter */}
              <span className="font-mono text-xs text-burgundy font-bold tracking-wider pl-1">
                0{currentPage + 1} / 0{totalPages}
              </span>
            </div>

            {/* Page Indicator Pills */}
            <div className="flex items-center space-x-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === idx
                      ? "w-6 bg-burgundy"
                      : "w-2 bg-dustyRose/40 hover:bg-dustyRose"
                  }`}
                  aria-label={`Jump to page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Tap to zoom tip */}
            <div className="text-[10px] font-mono text-mauve flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-dustyRose" />
              <span>Tap frame to zoom</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CERTIFICATE DETAIL LIGHTBOX MODAL                                         */}
      {/* ========================================================================= */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] p-6 sm:p-8 rounded-xl shadow-2xl max-w-lg w-full border-4 border-burgundy relative animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush text-burgundy flex items-center justify-center hover:bg-dustyRose hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-burgundy text-xs font-mono uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Official Verified Certificate</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-espresso mt-2">
              {selectedCert.title}
            </h3>
            <p className="text-sm font-mono text-mauve mt-1">
              Issued by {selectedCert.issuer} &bull; {selectedCert.date}
            </p>

            <div className="my-5 p-4 rounded-lg bg-blush/60 border border-dustyRose/40 space-y-2 text-xs font-mono text-espresso">
              <div>
                <span className="text-mauve block text-[10px]">CREDENTIAL ID</span>
                <span className="font-bold text-burgundy text-sm">
                  {selectedCert.credentialId}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-mauve block text-[10px]">VERIFIED SKILLS</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedCert.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white rounded border border-blush text-espresso"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-blush">
              <span className="text-xs font-mono text-mauve">
                Recipient: Kritika Panwar
              </span>
              <a
                href="https://github.com/Kritika-Panwar-151/"
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
