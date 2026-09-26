"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  X, ExternalLink, Github, Play, Pause, Volume2, VolumeX, 
  ChevronLeft, ChevronRight, Sparkles, MapPin, Heart, Key,
  CheckCircle2, Clock, Terminal, Layers, ArrowUpRight
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  metaphorBadge: string;
  metaphorIcon: string;
  cardImage: string;
  description: string;
  longDescription: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  mediaType: "video" | "image";
  videoSrc?: string;
  screenshots: string[];
  colorTheme: {
    cardBg: string;
    cardBorder: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
  };
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "sharebite",
    title: "ShareBite",
    subtitle: "Surplus Food Redistribution Network",
    category: "Mobile Application · Social Impact",
    metaphorBadge: "Artisanal Bento Lunchbox",
    metaphorIcon: "🍱",
    cardImage: "/projects/cards/sharebite_card.jpg",
    description: "Turning food surplus into community sustenance in real time &bull; Connecting commercial kitchens directly to orphanages & shelters.",
    longDescription: "Commercial restaurants, banquet caterers, and events regularly discard surplus cooked food, while neighboring shelters and orphanages face persistent meal shortages. ShareBite provides an instantaneous mobile platform with real-time geolocation routing to rescue and dispatch edible surplus food before it spoils.",
    techStack: ["Flutter 3", "Dart", "Firebase Auth", "Cloud Firestore", "Google Maps API", "FCM"],
    metrics: [
      { label: "Donations Processed", value: "12,450+" },
      { label: "Shelters Supported", value: "88+ Hubs" },
      { label: "Food Waste Saved", value: "14 Tons" },
    ],
    githubUrl: "https://github.com/shivanvithajayam/share_bite",
    mediaType: "video",
    videoSrc: "/projects/ShareBite/SHAREBITE.mp4",
    screenshots: [],
    colorTheme: {
      cardBg: "from-[#3D0A18] to-[#24060E]",
      cardBorder: "border-[#ECC880]",
      accent: "#ECC880",
      badgeBg: "bg-[#10B981]/20",
      badgeText: "text-[#34D399]",
    },
  },
  {
    id: "kafka",
    title: "Kafka Simulator",
    subtitle: "Distributed Event Streaming Visualizer",
    category: "Distributed Systems · Live Tool",
    metaphorBadge: "Sweet Shop Conveyor Sorter",
    metaphorIcon: "🧁",
    cardImage: "/projects/cards/kafka_card.jpg",
    description: "Demystifying distributed event streaming through an interactive visual sandbox with real-time partitions & consumer offsets.",
    longDescription: "Apache Kafka powers high-throughput data streaming across modern tech companies, but core mechanics like partition key hashing, immutable commit logs, consumer lag, and read offsets can be difficult to visualize. This simulator provides an interactive sandbox to produce custom events, trace partition routing, and observe offset advancement in real-time.",
    techStack: ["Next.js 14", "React 18", "Framer Motion", "TypeScript", "Tailwind CSS", "Vercel"],
    metrics: [
      { label: "Active Partitions", value: "3 Streams" },
      { label: "Key Hashing", value: "hash(key) % 3" },
      { label: "Commit Log", value: "100% Immutable" },
    ],
    githubUrl: "https://github.com/Kritika-Panwar-151/kafka-simulator",
    liveUrl: "https://kafka-simulator.vercel.app",
    mediaType: "image",
    screenshots: [
      "/projects/KafkaSimulation/1.jpeg",
      "/projects/KafkaSimulation/2.jpeg",
      "/projects/KafkaSimulation/3.jpeg",
      "/projects/KafkaSimulation/4.jpeg",
      "/projects/KafkaSimulation/5.jpeg",
      "/projects/KafkaSimulation/6.jpeg",
      "/projects/KafkaSimulation/7.jpeg",
    ],
    colorTheme: {
      cardBg: "from-[#FFFDF9] to-[#FAF5EE]",
      cardBorder: "border-[#ECC880]/40",
      accent: "#8B1E3F",
      badgeBg: "bg-[#FEF3C7]",
      badgeText: "text-[#92400E]",
    },
  },
  {
    id: "unistay",
    title: "UniStay",
    subtitle: "Campus Hostel Booking & Management",
    category: "Full-Stack Web Application · BMSCE",
    metaphorBadge: "Pastel Leatherette Dorm Trunk",
    metaphorIcon: "🧳",
    cardImage: "/projects/cards/unistay_card.jpg",
    description: "Streamlining campus residence discovery and room allocation for BMSCE students with single-room booking integrity.",
    longDescription: "Eliminates manual paper queues, lack of room vacancy transparency, and duplicate booking records by digitizing room discovery, gender-based allocations, and institutional KYC into a unified student & administrator portal.",
    techStack: ["Python", "Django (MVT)", "MySQL", "Google Maps API", "Django Admin"],
    metrics: [
      { label: "Assigned Room", value: "Room #412" },
      { label: "Booking Constraint", value: "1 Room / USN" },
      { label: "Room Tiers", value: "1 / 2 / 3 Sharing" },
    ],
    githubUrl: "https://github.com/Kritika-Panwar-151/FWD",
    mediaType: "image",
    screenshots: [
      "/projects/HostelGo/1.jpeg",
      "/projects/HostelGo/2.jpeg",
      "/projects/HostelGo/3.jpeg",
      "/projects/HostelGo/4.jpeg",
      "/projects/HostelGo/5.jpeg",
      "/projects/HostelGo/6.jpeg",
      "/projects/HostelGo/7.jpeg",
      "/projects/HostelGo/8.jpeg",
      "/projects/HostelGo/9.jpeg",
    ],
    colorTheme: {
      cardBg: "from-[#FFFDF9] to-[#FDF4F5]",
      cardBorder: "border-[#E8B4B8]",
      accent: "#BE185D",
      badgeBg: "bg-[#FCE7F3]",
      badgeText: "text-[#BE185D]",
    },
  },
  {
    id: "cie",
    title: "CIE Analyzer",
    subtitle: "Automated Academic Diagnostics Pipeline",
    category: "Data Processing · Educational Analytics",
    metaphorBadge: "Pastel Desk Organizer Boxes",
    metaphorIcon: "🗃️",
    cardImage: "/projects/cards/cie_card.jpg",
    description: "Automating internal evaluation pipelines to flag at-risk learners for early academic care via headless document conversion.",
    longDescription: "Analyzing exam spreadsheets manually across hundreds of engineering students across CIE 1, 2, and 3 is tedious and delays remedial intervention. CIE Analyzer automates batch upload, legacy format normalization, and statistical benchmark scoring to flag students who need extra academic assistance before final exams.",
    techStack: ["Python", "Django", "Pandas", "LibreOffice Headless", "Firebase Firestore", "Docker"],
    metrics: [
      { label: "Remedial Benchmark", value: "< 40% Flag" },
      { label: "Evaluations Tracked", value: "CIE 1, 2, 3" },
      { label: "Ingestion Format", value: "Batch ZIP" },
    ],
    githubUrl: "https://github.com/Kritika-Panwar-151/Slow-Learners",
    mediaType: "image",
    screenshots: [
      "/projects/SlowLearners/1.png",
      "/projects/SlowLearners/2.png",
      "/projects/SlowLearners/3.png",
      "/projects/SlowLearners/4.png",
      "/projects/SlowLearners/5.png",
      "/projects/SlowLearners/6.png",
      "/projects/SlowLearners/7.png",
      "/projects/SlowLearners/8.png",
      "/projects/SlowLearners/9.png",
      "/projects/SlowLearners/10.png",
      "/projects/SlowLearners/11.png",
    ],
    colorTheme: {
      cardBg: "from-[#FDF8F7] to-[#FAF0F2]",
      cardBorder: "border-[#F3D5D8]",
      accent: "#991B1B",
      badgeBg: "bg-[#FEE2E2]",
      badgeText: "text-[#991B1B]",
    },
  },
  {
    id: "smartattend",
    title: "SmartAttend",
    subtitle: "Geofenced Anti-Proxy Attendance Platform",
    category: "Cybersecurity · OOPS Java",
    metaphorBadge: "Pastel Lanyard & ID Badge",
    metaphorIcon: "🪪",
    cardImage: "/projects/cards/smartattend_card.jpg",
    description: "Eliminating proxy attendance through cryptographic geofencing and 1-student-1-device hardware binding.",
    longDescription: "Traditional roll calls and QR code attendance suffer from widespread proxy marking via remote link sharing or screenshot exchange. SmartAttend mathematically ensures that attendance can only be recorded if the student is physically within the classroom radius and using their registered personal device.",
    techStack: ["Java 17+", "Spring Boot", "Supabase (PostgreSQL)", "Haversine Distance", "Maven"],
    metrics: [
      { label: "Geofence Perimeter", value: "≤ 30m Radius" },
      { label: "Hardware Binding", value: "1 Device / USN" },
      { label: "Proxy Leakage", value: "0% Tolerated" },
    ],
    githubUrl: "https://github.com/Kritika-Panwar-151/JavaProject",
    mediaType: "image",
    screenshots: [
      "/projects/SmartAttendece/1.png",
      "/projects/SmartAttendece/2.png",
      "/projects/SmartAttendece/3.png",
      "/projects/SmartAttendece/4.png",
      "/projects/SmartAttendece/5.png",
      "/projects/SmartAttendece/6.png",
      "/projects/SmartAttendece/7.png",
      "/projects/SmartAttendece/8.png",
    ],
    colorTheme: {
      cardBg: "from-[#2D0A14] to-[#170308]",
      cardBorder: "border-white/20",
      accent: "#ECC880",
      badgeBg: "bg-white/10",
      badgeText: "text-[#ECC880]",
    },
  },
];

export default function ProjectsBento() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      setActiveSlide(0);
      setIsPlaying(true);
    } else {
      document.body.style.overflow = "";
    }
  }, [activeProject]);

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveProject(null);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-10 bg-[#FAF6F0] text-[#3B121E]">
      
      {/* SECTION HEADER (Matching User Reference Image) */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E3F] animate-pulse"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8B1E3F]">
            Interactive Creations
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3D0A18] font-bold tracking-tight">
              Portfolio Projects
            </h2>
            <p className="text-sm sm:text-base text-[#7A4555] mt-1.5 max-w-xl">
              Explore My Latest Work &bull; Click any cute physical object to open its interactive 2cm case study with real code and demo media.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FFFDF9] px-4 py-2 rounded-full border border-[#8B1E3F]/20 text-xs text-[#8B1E3F] shadow-sm font-medium">
            <span>✨ 5 Thematic Physical Objects</span>
          </div>
        </div>
      </div>

      {/* THE 5 PROJECTS GRID: TOP ROW 3 CARDS, BOTTOM ROW 2 CARDS */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ================= TOP ROW: 3 EQUAL COLUMNS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* CARD 01: SHAREBITE (Bento Lunchbox) */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[0])}
            className="group relative bg-[#FFFDF9] rounded-3xl p-3.5 border-2 border-[#ECC880]/50 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[330/365] rounded-2xl overflow-hidden shadow-inner bg-[#EFE9DC]">
              <Image 
                src={PROJECTS_DATA[0].cardImage}
                alt="ShareBite Bento Box"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="px-3 py-1.5 rounded-full bg-[#ECC880] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-1.5 mx-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open Bento Box Case Study</span>
                </span>
              </div>
            </div>

            <div className="mt-3 px-1 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#3D0A18] text-sm">01. ShareBite</span>
              <span className="text-[#8B1E3F] font-mono text-[11px] font-semibold flex items-center gap-1">
                <span>View Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* CARD 02: KAFKA SIMULATOR (Sweet Shop Conveyor) */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[1])}
            className="group relative bg-[#FFFDF9] rounded-3xl p-3.5 border-2 border-[#FDE68A] shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[340/355] rounded-2xl overflow-hidden shadow-inner bg-[#EFE9DC]">
              <Image 
                src={PROJECTS_DATA[1].cardImage}
                alt="Kafka Simulator Sweet Sorter"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="px-3 py-1.5 rounded-full bg-[#ECC880] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-1.5 mx-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Conveyor Case Study</span>
                </span>
              </div>
            </div>

            <div className="mt-3 px-1 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#3D0A18] text-sm">02. Kafka Simulator</span>
              <span className="text-[#8B1E3F] font-mono text-[11px] font-semibold flex items-center gap-1">
                <span>Live Vercel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* CARD 03: UNISTAY (Pastel Leatherette Dorm Trunk) */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[2])}
            className="group relative bg-[#FFFDF9] rounded-3xl p-3.5 border-2 border-[#E8B4B8] shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[335/365] rounded-2xl overflow-hidden shadow-inner bg-[#EFE9DC]">
              <Image 
                src={PROJECTS_DATA[2].cardImage}
                alt="UniStay Dorm Trunk"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="px-3 py-1.5 rounded-full bg-[#ECC880] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-1.5 mx-auto">
                  <Key className="w-3.5 h-3.5" />
                  <span>Open Suitcase Trunk</span>
                </span>
              </div>
            </div>

            <div className="mt-3 px-1 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#3D0A18] text-sm">03. UniStay</span>
              <span className="text-[#8B1E3F] font-mono text-[11px] font-semibold flex items-center gap-1">
                <span>Room #412</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM ROW: 2 EQUAL COLUMNS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* CARD 04: CIE ANALYZER (Pastel Desk Organizer Boxes) */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[3])}
            className="group relative bg-[#FFFDF9] rounded-3xl p-3.5 border-2 border-[#A7F3D0] shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[485/315] rounded-2xl overflow-hidden shadow-inner bg-[#EFE9DC]">
              <Image 
                src={PROJECTS_DATA[3].cardImage}
                alt="CIE Analyzer Desk Organizer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="px-3.5 py-1.5 rounded-full bg-[#ECC880] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-1.5 mx-auto">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Open Desk Organizer Case Study</span>
                </span>
              </div>
            </div>

            <div className="mt-3 px-1 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#3D0A18] text-sm">04. CIE Analyzer</span>
              <span className="text-[#8B1E3F] font-mono text-[11px] font-semibold flex items-center gap-1">
                <span>&lt; 40% Diagnostics</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* CARD 05: SMARTATTEND (Pastel Lanyard & Acrylic ID Badge) */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[4])}
            className="group relative bg-[#FFFDF9] rounded-3xl p-3.5 border-2 border-[#FBCFE8] shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[520/315] rounded-2xl overflow-hidden shadow-inner bg-[#EFE9DC]">
              <Image 
                src={PROJECTS_DATA[4].cardImage}
                alt="SmartAttend Lanyard Badge"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="px-3.5 py-1.5 rounded-full bg-[#ECC880] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-1.5 mx-auto">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open Geofence Badge Case Study</span>
                </span>
              </div>
            </div>

            <div className="mt-3 px-1 flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#3D0A18] text-sm">05. SmartAttend</span>
              <span className="text-[#8B1E3F] font-mono text-[11px] font-semibold flex items-center gap-1">
                <span>30m Geofence</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* EXPANDED MODAL (Strict 2cm Margin: inset-3 sm:inset-5 md:inset-7 lg:inset-8) */}
      {/* ========================================================================= */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-7 lg:p-8">
          
          {/* Backdrop Scrim */}
          <div 
            onClick={closeModal}
            className="fixed inset-0 bg-[#140408]/80 backdrop-blur-md transition-opacity duration-300"
          ></div>

          {/* Expanded Modal Box (2cm gap from edges) */}
          <div className="relative z-10 w-full max-w-6xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] bg-[#1A050B] rounded-3xl border-2 border-[#ECC880]/40 shadow-2xl overflow-y-auto overscroll-contain touch-pan-y flex flex-col scrollbar-thin scrollbar-thumb-[#8B1E3F] scrollbar-track-black/20">
            
            {/* Top Bar with Cute Object Title & Close Button */}
            <div className="sticky top-0 z-20 bg-[#2D0A14]/95 backdrop-blur-md px-6 py-4 border-b border-[#ECC880]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeProject.metaphorIcon}</span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ECC880] font-bold">
                    {activeProject.metaphorBadge}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white leading-tight">
                    {activeProject.title} &bull; <span className="text-[#ECC880]/80 font-normal text-sm">{activeProject.subtitle}</span>
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-[#FFFDF9]/10 hover:bg-[#FFFDF9]/20 border border-[#ECC880]/40 flex items-center justify-center text-[#ECC880] hover:text-white transition-all shadow-md group"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* MODAL CONTENT SWITCHER BASED ON PROJECT */}
            <div className="p-5 sm:p-7 md:p-8 text-[#FFF7ED]">
              
              {/* ---------------- 01. SHAREBITE: BENTO LUNCHBOX ---------------- */}
              {activeProject.id === "sharebite" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left: 2 Stacked Compartments */}
                    <div className="lg:col-span-5 flex flex-col gap-5">
                      
                      {/* Vegetable Harvest Chamber */}
                      <div className="bg-gradient-to-br from-[#122E22] via-[#0A1F16] to-[#05140D] rounded-2xl p-5 border border-[#34D399]/40 shadow-lg relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#34D399]/20 text-[#34D399] text-[10px] font-bold tracking-wider uppercase border border-[#34D399]/30">
                            🌱 Fresh Harvest &bull; Zero Waste
                          </span>
                          <span className="text-xs text-[#ECC880] font-mono">BENTO #01</span>
                        </div>
                        <h4 className="text-2xl font-serif text-[#F0FDF4] font-bold mb-2">
                          ShareBite Mission
                        </h4>
                        <p className="text-xs sm:text-sm text-[#A7F3D0]/90 leading-relaxed">
                          {activeProject.longDescription}
                        </p>
                        <div className="mt-4 pt-3 border-t border-[#34D399]/20 flex flex-wrap gap-2 text-xs">
                          <span className="px-2.5 py-1 rounded bg-[#064E3B] text-[#D1FAE5] font-medium">📍 Realtime Geo-Dispatch</span>
                          <span className="px-2.5 py-1 rounded bg-[#064E3B] text-[#D1FAE5] font-medium">⚡ 15-Min Pickup SLA</span>
                        </div>
                      </div>

                      {/* Warm Spices Chamber (Metrics & Ingredients) */}
                      <div className="bg-gradient-to-br from-[#2D0A14] to-[#1C040C] rounded-2xl p-5 border border-[#ECC880]/30 shadow-lg flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC880] font-bold">
                            Portions & Table Service
                          </span>
                          <div className="grid grid-cols-3 gap-2.5 my-3">
                            {activeProject.metrics.map((m) => (
                              <div key={m.label} className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-center">
                                <div className="text-base sm:text-lg font-serif text-[#ECC880] font-bold">{m.value}</div>
                                <div className="text-[10px] text-white/70 mt-0.5">{m.label}</div>
                              </div>
                            ))}
                          </div>

                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC880] font-bold">
                            Recipe Ingredients (Tech Stack)
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                            {activeProject.techStack.map((tech) => (
                              <span key={tech} className="px-2.5 py-1 rounded bg-[#ECC880]/15 text-[#ECC880] text-[11px] font-medium border border-[#ECC880]/30">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                          <a 
                            href={activeProject.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#3D0A18] text-xs font-bold shadow hover:brightness-110 transition-all flex items-center justify-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            <span>View GitHub Repository</span>
                          </a>
                        </div>
                      </div>

                    </div>

                    {/* Right: Steamed-Rice Canvas with Real Video Player */}
                    <div className="lg:col-span-7 bg-[#FCFBF7] text-[#1E1915] rounded-2xl p-5 shadow-2xl border-2 border-[#EADFC9] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs font-mono">
                          <span className="font-bold text-[#544335] flex items-center gap-1.5">
                            <span>🍚</span>
                            <span>STEAMED RICE PORCELAIN CANVAS</span>
                          </span>
                          <span className="text-[#8C7A6B]">SHAREBITE.mp4 (10MB)</span>
                        </div>

                        {/* Real Video Player */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg border-2 border-[#3E342B]/20">
                          <video 
                            ref={videoRef}
                            src={activeProject.videoSrc}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E8DFC9] flex items-center justify-between text-xs text-[#8C7A6B]">
                        <span className="flex items-center gap-1.5">
                          <span>🥢</span>
                          <span>Interactive Video Walkthrough of Donor &amp; Volunteer Flow</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={toggleMute}
                            className="px-2.5 py-1 rounded-md bg-[#EFE9DC] text-[#3D0A18] hover:bg-[#E2D8C3] font-medium flex items-center gap-1 text-[11px]"
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span>{isMuted ? "Unmute" : "Muted"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ---------------- 02. KAFKA: SWEET SHOP CONVEYOR ---------------- */}
              {activeProject.id === "kafka" && (
                <div className="space-y-6">
                  {/* Sweet Conveyor Belt Header */}
                  <div className="bg-gradient-to-r from-[#2A0610] via-[#1E040B] to-[#120206] p-5 rounded-2xl border border-[#ECC880]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#ECC880] mb-1">
                        <span>🧁</span>
                        <span>CONVEYOR SORTER ENGINE</span>
                      </div>
                      <h4 className="text-2xl font-serif font-bold text-white">
                        Apache Kafka Event Streaming Sandbox
                      </h4>
                      <p className="text-xs text-white/80 mt-1 max-w-2xl">
                        {activeProject.longDescription}
                      </p>
                    </div>
                    {activeProject.liveUrl && (
                      <a 
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#2D0A14] text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Live Vercel App ↗</span>
                      </a>
                    )}
                  </div>

                  {/* 3 Partition Sorter Baskets */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 rounded-xl border border-[#ECC880]/20 text-center">
                      <span className="text-2xl">🧁</span>
                      <h5 className="font-serif font-bold text-[#ECC880] mt-1">Partition 0 Basket</h5>
                      <p className="text-[11px] text-white/70 mt-0.5">Key Hash Routing: hash(key) % 3 == 0</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#ECC880]/20 text-[#ECC880] text-[10px] font-mono">
                        order_created events
                      </span>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-[#F472B6]/30 text-center">
                      <span className="text-2xl">🍬</span>
                      <h5 className="font-serif font-bold text-[#F472B6] mt-1">Partition 1 Basket</h5>
                      <p className="text-[11px] text-white/70 mt-0.5">Key Hash Routing: hash(key) % 3 == 1</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#F472B6]/20 text-[#F472B6] text-[10px] font-mono">
                        payment_done events
                      </span>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-[#34D399]/30 text-center">
                      <span className="text-2xl">🍰</span>
                      <h5 className="font-serif font-bold text-[#34D399] mt-1">Partition 2 Basket</h5>
                      <p className="text-[11px] text-white/70 mt-0.5">Key Hash Routing: hash(key) % 3 == 2</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#34D399]/20 text-[#34D399] text-[10px] font-mono">
                        user_signup events
                      </span>
                    </div>
                  </div>

                  {/* 7 Screenshots Gallery */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase text-[#ECC880] font-bold">
                        Interactive Architecture Screenshots ({activeSlide + 1} / {activeProject.screenshots.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : activeProject.screenshots.length - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setActiveSlide((prev) => (prev < activeProject.screenshots.length - 1 ? prev + 1 : 0))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Main Active Screenshot */}
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/20 mb-4">
                      <Image 
                        src={activeProject.screenshots[activeSlide]} 
                        alt="Kafka Simulator Screenshot" 
                        fill 
                        className="object-contain" 
                      />
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="grid grid-cols-7 gap-2">
                      {activeProject.screenshots.map((s, idx) => (
                        <div 
                          key={s}
                          onClick={() => setActiveSlide(idx)}
                          className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                            idx === activeSlide ? "border-[#ECC880] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={s} alt={`Slide ${idx + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="flex justify-end gap-3 pt-2">
                    <a 
                      href={activeProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Source Code</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ---------------- 03. UNISTAY: PASTEL DORM TRUNK ---------------- */}
              {activeProject.id === "unistay" && (
                <div className="space-y-6">
                  
                  {/* Suitcase Lid: Polaroid Photo Prints & Washi Tape */}
                  <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF3F5] to-[#FCEEF1] text-[#3D0A18] p-6 rounded-2xl border-2 border-[#E8B4B8] shadow-lg">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8B4B8]/40">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🧳</span>
                        <h4 className="font-serif font-bold text-lg text-[#8B1E3F]">
                          Dorm Room Polaroids &amp; Campus Map
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-[#BE185D] bg-[#FCE7F3] px-3 py-1 rounded-full border border-[#F472B6]/30 font-bold">
                        9 Room Photos Pinned
                      </span>
                    </div>

                    {/* Active Screenshot Display with Polaroid Styling */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 relative aspect-[16/10] bg-white p-3 rounded-2xl shadow-md border border-[#E8B4B8]/50 flex flex-col justify-between">
                        <div className="relative w-full h-[85%] rounded-xl overflow-hidden bg-black/5">
                          <Image 
                            src={activeProject.screenshots[activeSlide]} 
                            alt="Dorm Photo" 
                            fill 
                            className="object-contain" 
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 font-serif italic text-[#8B1E3F]">
                          <span>Photo {activeSlide + 1} of {activeProject.screenshots.length} &bull; UniStay Portal</span>
                          <span className="font-sans not-italic text-[11px] text-[#A24857]">Single / Double / Triple Sharing</span>
                        </div>
                      </div>

                      {/* Polaroid Thumbnails */}
                      <div className="lg:col-span-4 flex flex-col gap-2">
                        <span className="text-xs font-bold text-[#8B1E3F] uppercase tracking-wider">
                          Dorm Photo Snapshots
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {activeProject.screenshots.map((s, idx) => (
                            <div 
                              key={s}
                              onClick={() => setActiveSlide(idx)}
                              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                idx === activeSlide ? "border-[#BE185D] ring-2 ring-[#BE185D]/30 scale-105" : "border-white opacity-70 hover:opacity-100"
                              }`}
                            >
                              <Image src={s} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Suitcase Bottom: Keycard, Room #412 & Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#2D0A14] p-4 rounded-xl border border-[#ECC880]/30 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#ECC880]/20 flex items-center justify-center text-xl text-[#ECC880]">
                        🔑
                      </div>
                      <div>
                        <div className="text-xs text-[#ECC880] font-mono">Assigned Room</div>
                        <div className="text-lg font-serif font-bold text-white">Room #412</div>
                        <div className="text-[10px] text-white/60">Fluffy Pink Pom-Pom Key</div>
                      </div>
                    </div>
                    <div className="bg-[#2D0A14] p-4 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
                        🏢
                      </div>
                      <div>
                        <div className="text-xs text-[#ECC880] font-mono">Allocation Rule</div>
                        <div className="text-lg font-serif font-bold text-white">1 Room / USN</div>
                        <div className="text-[10px] text-white/60">Zero Double Bookings</div>
                      </div>
                    </div>
                    <div className="bg-[#2D0A14] p-4 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
                        📍
                      </div>
                      <div>
                        <div className="text-xs text-[#ECC880] font-mono">Campus Distance</div>
                        <div className="text-lg font-serif font-bold text-white">BMSCE Campus</div>
                        <div className="text-[10px] text-white/60">Google Maps Navigation</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-white/60 font-mono">Course: 23CS3AEFWD &bull; Guide: Mrs. Rachana M S</span>
                    <a 
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Source</span>
                    </a>
                  </div>

                </div>
              )}

              {/* ---------------- 04. CIE ANALYZER: DESK ORGANIZER ---------------- */}
              {activeProject.id === "cie" && (
                <div className="space-y-6">
                  
                  {/* 5-Step Pipeline Flow Banner */}
                  <div className="bg-black/40 p-4 rounded-2xl border border-[#ECC880]/30">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC880] font-bold block mb-2">
                      Automated 5-Step Diagnostic Pipeline
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono text-center">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/10">📦 1. ZIP Ingest</div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/10">📄 2. LibreOffice</div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/10">🐼 3. Pandas Engine</div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/10">🔥 4. Firestore</div>
                      <div className="bg-[#10B981]/20 text-[#34D399] p-2 rounded-lg border border-[#10B981]/40 font-bold">📈 5. Chart.js</div>
                    </div>
                  </div>

                  {/* Desk Organizer Boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#2D0A14] p-4 rounded-xl border border-red-500/30">
                      <span className="text-[10px] uppercase font-mono text-rose-300 font-bold">Diagnostic Rubber Stamp</span>
                      <div className="text-2xl font-serif font-bold text-rose-400 mt-1">&lt; 40% Score</div>
                      <p className="text-xs text-white/70 mt-1">Automatic threshold flag triggers early faculty remedial intervention.</p>
                    </div>
                    <div className="bg-[#2D0A14] p-4 rounded-xl border border-white/10">
                      <span className="text-[10px] uppercase font-mono text-[#ECC880] font-bold">Exam Scope</span>
                      <div className="text-2xl font-serif font-bold text-white mt-1">CIE 1, 2, 3</div>
                      <p className="text-xs text-white/70 mt-1">Longitudinal multi-exam progress comparison across semester.</p>
                    </div>
                    <div className="bg-[#2D0A14] p-4 rounded-xl border border-white/10">
                      <span className="text-[10px] uppercase font-mono text-[#34D399] font-bold">Deployment</span>
                      <div className="text-2xl font-serif font-bold text-white mt-1">Dockerized</div>
                      <p className="text-xs text-white/70 mt-1">Encapsulating LibreOffice system binaries for cross-platform reliability.</p>
                    </div>
                  </div>

                  {/* 11 Screenshots Gallery */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase text-[#ECC880] font-bold">
                        Examination Roster &amp; Dashboard Slides ({activeSlide + 1} / {activeProject.screenshots.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : activeProject.screenshots.length - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setActiveSlide((prev) => (prev < activeProject.screenshots.length - 1 ? prev + 1 : 0))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/20 mb-4">
                      <Image 
                        src={activeProject.screenshots[activeSlide]} 
                        alt="CIE Analyzer Screenshot" 
                        fill 
                        className="object-contain" 
                      />
                    </div>

                    <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
                      {activeProject.screenshots.map((s, idx) => (
                        <div 
                          key={s}
                          onClick={() => setActiveSlide(idx)}
                          className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                            idx === activeSlide ? "border-[#ECC880] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={s} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-white/60 font-mono">BMSCE CSE &bull; Guide: Prof. Monisha HM</span>
                    <a 
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  </div>

                </div>
              )}

              {/* ---------------- 05. SMARTATTEND: LANYARD ID BADGE ---------------- */}
              {activeProject.id === "smartattend" && (
                <div className="space-y-6">
                  
                  {/* Top Security Scope Banner */}
                  <div className="bg-gradient-to-r from-[#200612] to-[#120208] p-5 rounded-2xl border border-[#ECC880]/30 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Radar graphic on Left */}
                    <div className="md:col-span-4 flex flex-col items-center text-center">
                      <div className="relative w-36 h-36 rounded-full border border-[#10B981]/40 flex items-center justify-center">
                        <div className="absolute inset-2 rounded-full border border-dashed border-[#ECC880]/30 animate-spin" style={{ animationDuration: "25s" }}></div>
                        <div className="text-center">
                          <span className="text-3xl">📍</span>
                          <div className="text-[10px] font-mono text-[#34D399] font-bold mt-1">30m GEOFENCE</div>
                          <div className="text-[9px] font-mono text-[#ECC880]/70">Haversine Lock</div>
                        </div>
                      </div>
                    </div>

                    {/* Security Details on Right */}
                    <div className="md:col-span-8">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#ECC880] font-bold">
                        Anti-Proxy Security Handshake
                      </span>
                      <h4 className="text-2xl font-serif font-bold text-white mt-1">
                        Cryptographic Geofence &amp; Hardware Lock
                      </h4>
                      <p className="text-xs text-white/80 mt-1 leading-relaxed">
                        {activeProject.longDescription}
                      </p>
                      
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded bg-black/40 text-[#ECC880] font-mono border border-[#ECC880]/20">
                          d = 2r &bull; arcsin(...)
                        </span>
                        <span className="px-2.5 py-1 rounded bg-[#10B981]/20 text-[#34D399] font-mono border border-[#10B981]/30">
                          1 Student = 1 Device ID
                        </span>
                        <span className="px-2.5 py-1 rounded bg-white/10 text-white font-mono">
                          Dynamic Session Code Expiry
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* 8 Screenshots Gallery */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono uppercase text-[#ECC880] font-bold">
                        Security Terminal &amp; Supabase Ledger ({activeSlide + 1} / {activeProject.screenshots.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : activeProject.screenshots.length - 1))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setActiveSlide((prev) => (prev < activeProject.screenshots.length - 1 ? prev + 1 : 0))}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/20 mb-4">
                      <Image 
                        src={activeProject.screenshots[activeSlide]} 
                        alt="SmartAttend Screenshot" 
                        fill 
                        className="object-contain" 
                      />
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {activeProject.screenshots.map((s, idx) => (
                        <div 
                          key={s}
                          onClick={() => setActiveSlide(idx)}
                          className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                            idx === activeSlide ? "border-[#ECC880] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image src={s} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-white/60 font-mono">BMSCE CSE &bull; Guide: Prof. Monisha HM</span>
                    <a 
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#3D0A18] text-xs font-bold shadow flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
