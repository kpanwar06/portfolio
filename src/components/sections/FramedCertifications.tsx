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
  FileText,
  Star,
  Hourglass,
} from "lucide-react";

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl?: string;
  pdfUrl?: string;
  image?: string;
  skills: string[];
  honors?: string;
  score?: string;
}

export default function FramedCertifications() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState<boolean>(false);

  // 11 Official Authenticated Certificates
  // Ordered with top-prestige & main credentials first
  const certificates: CertificateItem[] = [
    // ================= PAGE 1: CORE PRESTIGE & HIGH-IMPACT CREDENTIALS =================
    {
      id: 1,
      title: "Ethics in Engineering Practice",
      issuer: "NPTEL & IIT Kharagpur (MoE, Govt. of India)",
      date: "Feb–Apr 2026",
      credentialId: "NPTEL26MG42S1550207092",
      verificationUrl: "https://nptel.ac.in/",
      skills: ["Engineering Ethics", "Governance", "Professional Standards", "IIT Kharagpur"],
      image: "/certificates/26_Nptel_Ethics.jpeg",
      honors: "Elite + Top 2% Topper",
      score: "88% Consolidated (Online: 22.08/25 • Exam: 66/75)",
    },
    {
      id: 2,
      title: "Django Web Framework",
      issuer: "Meta & Coursera",
      date: "Dec 9, 2024",
      credentialId: "VEBNRQ8HZQC1",
      verificationUrl: "https://coursera.org/verify/VEBNRQ8HZQC1",
      pdfUrl: "/certificates/Kritika_DjangoWebFramework.pdf",
      image: "/certificates/Kritika_DjangoWebFramework.png",
      skills: ["Django", "Python", "ORM", "MVT Architecture", "REST APIs"],
      honors: "Meta Certified Professional",
    },
    {
      id: 3,
      title: "Programming in Python",
      issuer: "Meta & Coursera",
      date: "Dec 9, 2024",
      credentialId: "C4PEWCB4T42X",
      verificationUrl: "https://coursera.org/verify/C4PEWCB4T42X",
      pdfUrl: "/certificates/Kritika_ProgrammingInPython.pdf",
      image: "/certificates/Kritika_ProgrammingInPython.png",
      skills: ["Python 3", "Data Structures", "OOP", "Unit Testing", "Algorithms"],
      honors: "Meta Certified Professional",
    },
    {
      id: 4,
      title: "Introduction to Databases for Back-End",
      issuer: "Meta & Coursera",
      date: "Dec 9, 2024",
      credentialId: "AER000NX4SCW",
      verificationUrl: "https://coursera.org/verify/AER000NX4SCW",
      pdfUrl: "/certificates/Kritika_IntroToDatabases.pdf",
      image: "/certificates/Kritika_IntroToDatabases.png",
      skills: ["MySQL", "Relational Databases", "SQL Queries", "Schema Design"],
      honors: "Meta Certified Professional",
    },

    // ================= PAGE 2: SYSTEMS, LINUX & CORE BACK-END =================
    {
      id: 5,
      title: "Red Hat System Administration I (RH124)",
      issuer: "Red Hat, Inc.",
      date: "Dec 7, 2025",
      credentialId: "RH124 - RHA Ver. 10 (40 Credit Hours)",
      verificationUrl: "https://www.credly.com/badges/91ee0aa4-53fd-467f-bde0-ec6feafae416",
      pdfUrl: "/certificates/25_RedHat10.pdf",
      image: "/certificates/25_RedHat10.png",
      skills: ["Linux SysAdmin", "Red Hat Enterprise", "CLI", "Systems & Storage"],
      honors: "Red Hat Enterprise Training (40 hrs)",
    },
    {
      id: 6,
      title: "Getting Started with Linux Fundamentals (RH104)",
      issuer: "Red Hat, Inc.",
      date: "Nov 16, 2025",
      credentialId: "RH104 - RHA Ver. 9.1 (16 Credit Hours)",
      verificationUrl: "https://www.credly.com/badges/8cd997e7-e6ee-4cc2-b91b-5267e47340be",
      pdfUrl: "/certificates/25_RedHat9.1.pdf",
      image: "/certificates/25_RedHat9.1.png",
      skills: ["Linux Fundamentals", "Filesystems", "Permissions", "Bash"],
      honors: "Red Hat Enterprise Training (16 hrs)",
    },
    {
      id: 7,
      title: "Introduction to Back-End Development",
      issuer: "Meta & Coursera",
      date: "Dec 9, 2024",
      credentialId: "VHLGRI5L92ZL",
      verificationUrl: "https://coursera.org/verify/VHLGRI5L92ZL",
      pdfUrl: "/certificates/Kritika_IntroToBackEndDev.pdf",
      image: "/certificates/Kritika_IntroToBackEndDev.png",
      skills: ["Back-End Architecture", "HTTP & REST", "Servers", "Web Frameworks"],
      honors: "Meta Certified Professional",
    },
    {
      id: 8,
      title: "Version Control with Git & GitHub",
      issuer: "Meta & Coursera",
      date: "Dec 9, 2024",
      credentialId: "OJLFFUI04H07",
      verificationUrl: "https://coursera.org/verify/OJLFFUI04H07",
      pdfUrl: "/certificates/Kritika_VersionControl.pdf",
      image: "/certificates/Kritika_VersionControl.png",
      skills: ["Git", "GitHub", "Branching", "Pull Requests", "CI/CD"],
      honors: "Meta Certified Professional",
    },

    // ================= PAGE 3: ENTERPRISE GIT & INDUSTRY WORKFLOWS =================
    {
      id: 9,
      title: "Mastering Git",
      issuer: "Infosys Springboard",
      date: "May 30, 2026",
      credentialId: "INFOSYS-GIT-MASTER-2026",
      verificationUrl: "https://verify.onwingspan.com",
      pdfUrl: "/certificates/26_Infosys_MasteringGit.pdf",
      image: "/certificates/26_Infosys_MasteringGit.png",
      skills: ["Advanced Git", "Rebase", "Cherry-Pick", "Branching Architecture"],
      honors: "Infosys Verified Credential",
    },
    {
      id: 10,
      title: "Project on Git",
      issuer: "Infosys Springboard",
      date: "May 30, 2026",
      credentialId: "INFOSYS-GIT-PROJECT-2026",
      verificationUrl: "https://verify.onwingspan.com",
      pdfUrl: "/certificates/26_Infosys_ProjectOnGit.pdf",
      image: "/certificates/26_Infosys_ProjectOnGit.png",
      skills: ["Project Collaboration", "Repository Setup", "Workflow Automation"],
      honors: "Infosys Verified Credential",
    },
    {
      id: 11,
      title: "TechA Git Foundation Certification",
      issuer: "TechA & Infosys Wingspan",
      date: "June 1, 2026",
      credentialId: "TECHA-GIT-FOUNDATION-2026",
      verificationUrl: "https://verify.onwingspan.com",
      pdfUrl: "/certificates/26_TechA_Git.pdf",
      image: "/certificates/26_TechA_Git.png",
      skills: ["Git Foundations", "Version Tracking", "Merge Conflict Handling"],
      honors: "TechA Verified Credential",
    },
  ];

  // Dynamically calculate total pages (4 per page)
  const totalPages = Math.ceil(certificates.length / 4);

  // Group into pages of exactly 4 frames.
  // Any empty slots are padded with null to render "COMING SOON" frames.
  const pages: (CertificateItem | null)[][] = Array.from({ length: totalPages }, (_, i) => {
    const slice = certificates.slice(i * 4, (i + 1) * 4);
    const padded: (CertificateItem | null)[] = [...slice];
    while (padded.length < 4) {
      padded.push(null);
    }
    return padded;
  });

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
              Rigorous coursework, top-tier engineering distinctions, and verified professional certifications in distributed systems, back-end development, and cloud infrastructure.
            </p>

            <div className="mt-5 space-y-2 font-mono text-[11px] text-mauve-dark">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>NPTEL &bull; IIT Kharagpur Elite Topper (Top 2%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>Meta Professional &bull; Python, Django &amp; Database Design</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>Red Hat Enterprise &bull; System Administration (RH124/RH104)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-burgundy flex-shrink-0" />
                <span>Infosys Springboard &bull; Git &amp; Enterprise Project Workflows</span>
              </div>
            </div>
          </div>

          {/* Left Column Footer Note */}
          <div className="pt-4 border-t border-blush/60">
            <span className="text-[10px] font-mono text-dustyRose uppercase tracking-wider block font-semibold">
              Authentic Verification:
            </span>
            <p className="text-xs font-serif italic text-espresso/75 mt-0.5">
              Click any frame to inspect the full certificate, verify credentials, and view official transcripts.
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
                  {pageGroup.map((cert, slotIdx) =>
                    cert ? (
                      // ================= AUTHENTIC CERTIFICATE FRAME =================
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
                          <div className="w-full h-full bg-[#FFFDF9] rounded-xs border border-dustyRose/20 shadow-inner flex flex-col justify-between relative z-10 overflow-hidden">
                            {cert.image ? (
                              // Real Certificate Image Preview
                              <div className="relative w-full h-full overflow-hidden bg-white flex flex-col">
                                <div className="relative w-full h-full overflow-hidden">
                                  <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                  {/* Top Badge for Honors */}
                                  {cert.honors && (
                                    <div className="absolute top-1.5 right-1.5 bg-burgundy/95 text-white text-[7px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs z-10 flex items-center space-x-0.5">
                                      <Star className="w-2 h-2 text-yellow-300 fill-yellow-300" />
                                      <span>
                                        {cert.honors.includes("Topper")
                                          ? "TOPPER 2%"
                                          : cert.honors.includes("Meta")
                                          ? "META"
                                          : "VERIFIED"}
                                      </span>
                                    </div>
                                  )}
                                  {/* Hover Overlay */}
                                  <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] z-10">
                                    <span className="px-2.5 py-1 bg-burgundy text-cream text-[9px] font-mono rounded shadow flex items-center space-x-1">
                                      <Sparkles className="w-2.5 h-2.5 text-cream" />
                                      <span>Inspect Certificate</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              // Fallback Editorial Cardstock
                              <div className="p-2.5 sm:p-3 flex flex-col justify-between h-full">
                                <div className="flex items-center justify-between border-b border-blush pb-1">
                                  <div className="flex items-center space-x-1">
                                    <Award className="w-3 h-3 text-burgundy" />
                                    <span className="text-[8px] font-mono tracking-widest uppercase text-burgundy font-bold">
                                      VERIFIED CREDENTIAL
                                    </span>
                                  </div>
                                  <span className="text-[9px] font-mono text-mauve font-semibold">
                                    {cert.date}
                                  </span>
                                </div>
                                <div className="my-auto py-1 text-center">
                                  <h3 className="font-serif text-xs sm:text-sm font-bold text-espresso leading-snug line-clamp-2">
                                    {cert.title}
                                  </h3>
                                  <p className="text-[9.5px] font-mono text-mauve-dark italic truncate mt-0.5">
                                    {cert.issuer}
                                  </p>
                                </div>
                                <div className="pt-1 border-t border-blush flex items-center justify-between">
                                  <span className="text-[8px] font-mono text-burgundy font-bold">
                                    {cert.credentialId}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Brass Nameplate at Frame Base */}
                          <div className="mt-1 py-0.5 px-2 bg-gradient-to-r from-[#d8a47f]/80 via-[#f5d9b5] to-[#d8a47f]/80 rounded text-center shadow-2xs border border-[#b88562] flex-shrink-0">
                            <span className="text-[7.5px] font-mono text-espresso font-bold uppercase tracking-wider block truncate">
                              {cert.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // ================= EMPTY FRAME: "COMING SOON" =================
                      <div
                        key={`coming-soon-${pageIdx}-${slotIdx}`}
                        onClick={() => setComingSoonModalOpen(true)}
                        className="physical-frame group cursor-pointer transition-all duration-300 hover:-translate-y-1 relative h-[180px] sm:h-[195px] md:h-[210px]"
                      >
                        {/* Picture Frame Outer Border */}
                        <div className="w-full h-full p-2 sm:p-2.5 rounded-lg bg-[#38262a] shadow-[-6px_10px_25px_rgba(38,28,30,0.22)] border-[4px] sm:border-[6px] border-[#291b1e] relative flex flex-col justify-between overflow-hidden">
                          {/* Glass Sheen Glare */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20" />

                          {/* Inner Matting with Dashed Vintage Border */}
                          <div className="w-full h-full bg-[#FFFDF9]/95 rounded-xs p-3 border-2 border-dashed border-dustyRose/40 shadow-inner flex flex-col justify-between items-center text-center relative z-10">
                            <div className="flex items-center space-x-1 text-dustyRose pt-0.5">
                              <Sparkles className="w-3 h-3 text-dustyRose" />
                              <span className="text-[7.5px] font-mono tracking-widest uppercase font-bold text-mauve">
                                UPCOMING ACCREDITATION
                              </span>
                              <Sparkles className="w-3 h-3 text-dustyRose" />
                            </div>

                            <div className="my-auto py-1">
                              <h3 className="font-serif text-sm sm:text-base font-bold text-burgundy tracking-widest uppercase">
                                COMING SOON
                              </h3>
                              <p className="text-[9px] font-mono text-mauve-dark italic mt-0.5">
                                Next milestone in progress
                              </p>
                            </div>

                            <div className="w-full pt-1 border-t border-blush flex items-center justify-center">
                              <span className="text-[7px] font-mono text-dustyRose uppercase tracking-wider font-semibold">
                                [ RESERVED FRAME &bull; 2026 ]
                              </span>
                            </div>
                          </div>

                          {/* Brass Nameplate at Frame Base */}
                          <div className="mt-1 py-0.5 px-2 bg-gradient-to-r from-[#d8a47f]/80 via-[#f5d9b5] to-[#d8a47f]/80 rounded text-center shadow-2xs border border-[#b88562] flex-shrink-0">
                            <span className="text-[7.5px] font-mono text-espresso font-bold uppercase tracking-wider block truncate">
                              COMING SOON &bull; RESERVED
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* SLIDER CONTROLS (PLACED BELOW THE RIGHT COLUMN OF FRAMES)             */}
          {/* ===================================================================== */}
          <div className="mt-3 pt-3 border-t border-blush/60 flex items-center justify-between px-1">
            <div className="flex items-center space-x-3">
              {/* Left Arrow Button (Strictly Moves Left / Back) */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-xs active:scale-95 ${
                  currentPage === 0
                    ? "opacity-25 cursor-not-allowed border-mauve/30 text-mauve"
                    : "border-burgundy/50 text-burgundy hover:bg-burgundy hover:text-white cursor-pointer"
                }`}
                title="Previous certificates"
                aria-label="Previous certificates"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Right Arrow Button (Strictly Moves Right / Next) */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all shadow-xs active:scale-95 ${
                  currentPage === totalPages - 1
                    ? "opacity-25 cursor-not-allowed border-mauve/30 text-mauve"
                    : "border-burgundy/50 text-burgundy hover:bg-burgundy hover:text-white cursor-pointer"
                }`}
                title="Next certificates"
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
      {/* COMING SOON LIGHTBOX MODAL                                                */}
      {/* ========================================================================= */}
      {comingSoonModalOpen && (
        <div
          onClick={() => setComingSoonModalOpen(false)}
          className="fixed inset-0 z-50 bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFDF9] p-6 sm:p-8 rounded-xl shadow-2xl max-w-md w-full border-4 border-burgundy relative text-center animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setComingSoonModalOpen(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-blush text-burgundy flex items-center justify-center hover:bg-dustyRose hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-blush text-burgundy flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Hourglass className="w-6 h-6 animate-pulse" />
            </div>

            <div className="text-xs font-mono uppercase tracking-widest text-burgundy font-bold mb-1">
              RESERVED GALLERY FRAME
            </div>

            <h3 className="text-2xl font-serif font-bold text-espresso">
              Coming Soon
            </h3>

            <p className="text-xs font-serif italic text-espresso/80 mt-2 leading-relaxed">
              This frame is reserved for upcoming engineering accreditations and professional milestones currently in progress.
            </p>

            <div className="mt-5 pt-4 border-t border-blush flex justify-center">
              <button
                onClick={() => setComingSoonModalOpen(false)}
                className="px-5 py-1.5 bg-burgundy hover:bg-burgundy-light text-cream rounded-md text-xs font-mono font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CERTIFICATE DETAIL LIGHTBOX MODAL                                         */}
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
              <span>{selectedCert.honors || "Official Verified Credential"}</span>
            </div>

            {/* Title & Issuer */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-espresso mt-1 leading-tight">
              {selectedCert.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-mauve mt-0.5">
              Issued by <span className="font-semibold text-burgundy">{selectedCert.issuer}</span> &bull; {selectedCert.date}
            </p>

            {/* Score / Distinction Banner if present */}
            {selectedCert.score && (
              <div className="mt-3 p-2.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-600 fill-amber-500 flex-shrink-0" />
                <div>
                  <span className="font-bold block">Elite Top 2% Distinction:</span>
                  <span className="text-[11px]">{selectedCert.score}</span>
                </div>
              </div>
            )}

            {/* Real Certificate Image Preview in Modal */}
            {selectedCert.image && (
              <div className="mt-4 rounded-lg overflow-hidden border border-blush shadow-inner bg-cream/50 relative">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[340px] object-contain mx-auto pointer-events-none select-none"
                />
              </div>
            )}

            {/* Metadata Card */}
            <div className="my-4 p-3.5 rounded-lg bg-blush/60 border border-dustyRose/40 space-y-2.5 text-xs font-mono text-espresso">
              <div>
                <span className="text-mauve block text-[10px] uppercase font-semibold tracking-wider">
                  CREDENTIAL / ENROLLMENT ID
                </span>
                <span className="font-bold text-burgundy text-xs sm:text-sm select-all">
                  {selectedCert.credentialId}
                </span>
              </div>

              <div>
                <span className="text-mauve block text-[10px] uppercase font-semibold tracking-wider">
                  VERIFIED COMPETENCIES &amp; TOPICS
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedCert.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white rounded border border-blush text-espresso text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-blush">
              <span className="text-xs font-mono text-mauve">
                Recipient: <strong className="text-espresso">Kritika Panwar</strong>
              </span>

              <div className="flex items-center space-x-2">
                {/* View Original PDF (if available) */}
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-burgundy/40 text-burgundy hover:bg-burgundy/10 rounded-md text-xs font-mono font-semibold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View PDF</span>
                  </a>
                )}

                {/* Direct Verification Link */}
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-burgundy hover:bg-burgundy-light text-cream rounded-md text-xs font-mono font-semibold transition-colors shadow-xs"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
