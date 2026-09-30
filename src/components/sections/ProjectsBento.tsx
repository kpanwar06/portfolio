"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  X, ExternalLink, Github, Play, Pause, Volume2, VolumeX, 
  ChevronLeft, ChevronRight, Sparkles, MapPin, Key,
  CheckCircle2, Clock, Terminal, Layers, ArrowUpRight,
  ShieldCheck, Database, Server, Smartphone, Cpu, FileText
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  officialName: string;
  subtitle: string;
  academicInfo: string;
  overview: string;
  problem: string;
  solution: string;
  functionalities: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  mediaType: "video" | "image";
  videoSrc?: string;
  screenshots: string[];
  objectMeta: {
    icon: string;
    tag: string;
    material: string;
  };
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "unistay",
    title: "UniStay",
    officialName: "UniStay — BMSCE Hostel Booking and Management System",
    subtitle: "Centralized Campus Residence Discovery & Single-Booking Allocation",
    academicInfo: "B.M.S. College of Engineering · Course 23CS3AEFWD · Guide: Mrs. Rachana M S",
    overview: "UniStay is a web-based hostel booking and management system developed exclusively for students of B.M.S. College of Engineering (BMSCE). The application provides a centralized platform where students can view hostel block details, browse room vacancies, and submit booking requests with verified institutional integrity.",
    problem: "Manual paper queues, lack of room vacancy transparency, and duplicate booking records during annual student hostel allotment create administrative gridlock.",
    solution: "A centralized campus accommodation portal enforcing strict relational database constraints ensuring one verified room per student USN, real-time vacancy maps, gender-segregated block allocation, and admin KYC verification.",
    functionalities: [
      "Student Registration & USN KYC Authentication against university records",
      "Hostel Block & Room Discovery with filters for Single, Double & Triple sharing",
      "Single-Booking Relational Integrity (1 Student = 1 Room Rule preventing duplicate allotments)",
      "Interactive Campus Distance Map showing BMSCE hostel proximity and amenities",
      "Administrative Inventory Portal for vacancy approval, tenant records, and allocation logs"
    ],
    techStack: [
      { category: "Architecture", items: ["Python 3", "Django (MVT Pattern)", "Django Admin"] },
      { category: "Database", items: ["SQLite / MySQL", "Relational Integrity Constraints", "ORM"] },
      { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Responsive Design"] },
      { category: "Services", items: ["Google Maps Platform", "KYC Verification", "Role-Based Access Control"] }
    ],
    metrics: [
      { label: "Assigned Demo", value: "Room #412" },
      { label: "Booking Rule", value: "1 Room / USN" },
      { label: "Room Tiers", value: "1 / 2 / 3 Sharing" }
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
      "/projects/HostelGo/9.jpeg"
    ],
    objectMeta: {
      icon: "🧳",
      tag: "VINTAGE DORM TRUNK",
      material: "Dusty Rose Leather & Brass"
    }
  },
  {
    id: "sharebite",
    title: "ShareBite",
    officialName: "ShareBite: A Surplus Food Donation Management System",
    subtitle: "Real-Time Mobile Redistribution Network Connecting Donors to Shelters",
    academicInfo: "B.M.S. College of Engineering · Course 23CS4AEMAD · Guide: Prof. Sonika Sharma D · HOD: Dr. Kavitha Sooda",
    overview: "ShareBite is a mobile-based surplus food donation management system developed to bridge the gap between food donors and charitable organizations. The system connects commercial restaurants, banquet caterers, and residential donors directly to nearby verified orphanages and shelters to ensure edible food is rescued before spoiling.",
    problem: "Commercial kitchens and event caterers regularly discard edible surplus food at closing time, while neighboring shelters and orphanages face persistent meal shortages due to the lack of an immediate logistics coordination channel.",
    solution: "An instantaneous mobile platform pairing commercial donors with verified shelters via geohash radius proximity queries within a strict 15-minute emergency pickup SLA, verified by OTP handoffs.",
    functionalities: [
      "Donor Food Listing Form (quantity in kg/portions, expiry window, veg/non-veg type, pickup address)",
      "Real-Time Interactive NGO Discovery Map with geohash radius proximity queries",
      "15-Minute Emergency Pickup SLA with live volunteer dispatch routing",
      "OTP-Verified Delivery Handoffs, donation history tracking, and donor reviews",
      "Real-Time Push Notification Engine notifying nearby shelters the moment surplus food is listed"
    ],
    techStack: [
      { category: "Mobile Client", items: ["Flutter 3", "Dart", "Provider State Management"] },
      { category: "Cloud Backend", items: ["Firebase Authentication", "Cloud Firestore", "Cloud Functions"] },
      { category: "Media & Storage", items: ["Cloudinary Media Engine", "Firebase Storage"] },
      { category: "Location & Sync", items: ["Google Maps Platform", "Geolocator API", "FCM Notifications"] }
    ],
    metrics: [
      { label: "Donations Logged", value: "12,450+" },
      { label: "Partner Shelters", value: "88+ Hubs" },
      { label: "Pickup SLA", value: "15-Min Response" }
    ],
    githubUrl: "https://github.com/shivanvithajayam/share_bite",
    mediaType: "video",
    videoSrc: "/projects/ShareBite/SHAREBITE.mp4",
    screenshots: [],
    objectMeta: {
      icon: "🍱",
      tag: "WOODEN BENTO BOX",
      material: "Dark Lacquer & Gold Bevels"
    }
  },
  {
    id: "kafka",
    title: "Kafka Simulator",
    officialName: "Kafka Simulator — Interactive Browser-Based Distributed Streaming Sandbox",
    subtitle: "Interactive Visual Simulation of Partitions, Consumer Offsets & Rebalance",
    academicInfo: "Independent Systems Architecture Visualizer · Deployed on Vercel Edge",
    overview: "Kafka Simulator is an interactive browser-based visual simulation tool designed to demystify core Apache Kafka concepts. Built using Next.js and React state without requiring a real cluster or database, it allows developers to produce custom events, trace deterministic key hashing into partition streams, inspect offsets, and observe dynamic consumer group rebalances in real time.",
    problem: "Core distributed streaming mechanics—such as partition key hashing, immutable commit logs, consumer group offsets, consumer lag, and automated rebalances—are abstract and difficult to grasp from documentation alone.",
    solution: "An interactive browser-based simulation where developers produce custom events, trace deterministic key routing via hash(key) % 3 across P0, P1, and P2 streams, and observe real-time consumer lag advancement.",
    functionalities: [
      "Custom JSON Event Production with configurable keys and message payloads",
      "Deterministic Partition Routing Visualizer using hash(key) % 3 algorithm",
      "Real-Time Consumer Group Offset Tracking and Dynamic Consumer Lag Calculation",
      "Simulated Cluster Node Rebalance and Broker Topic Stream Inspection",
      "Step-by-Step Architectural Explanation Panels and Interactive Play/Pause Simulator"
    ],
    techStack: [
      { category: "Core Engine", items: ["Next.js 14 (App Router)", "React 18", "TypeScript"] },
      { category: "Animation & Styling", items: ["Framer Motion", "Tailwind CSS", "Lucide Icons"] },
      { category: "Audio & Physics", items: ["Web Audio API", "Interactive Roller Canvas"] },
      { category: "Deployment", items: ["Vercel Edge Network", "Client-Side Virtual Event Engine"] }
    ],
    metrics: [
      { label: "Active Partitions", value: "3 Streams (P0, P1, P2)" },
      { label: "Key Algorithm", value: "hash(key) % 3" },
      { label: "Commit Log", value: "100% Immutable" }
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
      "/projects/KafkaSimulation/7.jpeg"
    ],
    objectMeta: {
      icon: "⚙️",
      tag: "EVENT-STREAM MACHINE",
      material: "Charcoal Metal & Champagne Brass"
    }
  },
  {
    id: "cie",
    title: "CIE Analyzer",
    officialName: "CIE Analyzer — Slow Learner Detection & Academic Diagnostics Pipeline",
    subtitle: "Automated Batch Document Normalization & At-Risk Early Warning Pipeline",
    academicInfo: "B.M.S. College of Engineering · Dept. of CSE · Guide: Prof. Monisha H M",
    overview: "CIE Analyzer is an automated educational evaluation analytics engine designed to identify engineering students requiring early academic care. By automating batch document normalization and statistical outlier benchmarking across semester evaluations (CIE 1, 2, and 3), the system flags at-risk learners early so faculty can organize remedial intervention.",
    problem: "Analyzing semester evaluation spreadsheets manually across hundreds of engineering students across CIE 1, 2, and 3 is tedious, error-prone, and delays remedial intervention until it is too late before final exams.",
    solution: "An automated headless document ingestion pipeline that extracts tabular marks from uploaded ZIP archives, normalizes legacy formats via headless LibreOffice in Docker, processes marks through Pandas, and flags students scoring below 40% for faculty intervention.",
    functionalities: [
      "Batch ZIP Archive Ingestion & Automated Unpacking Service",
      "Headless LibreOffice Normalization converting heterogeneous doc/xls files into uniform CSVs",
      "Pandas Dataframe Processing & Multi-Exam Longitudinal Progress Aggregation",
      "Default 40% Remedial Threshold Outlier Flagging triggering faculty intervention workflows",
      "Faculty Analytics Dashboard with section, subject, and student progress curves"
    ],
    techStack: [
      { category: "Backend Engine", items: ["Python 3", "Django", "Pandas DataFrames"] },
      { category: "Document Processing", items: ["LibreOffice Headless", "Docker System Container"] },
      { category: "Database & Cloud", items: ["Firebase Firestore", "Cloud Storage"] },
      { category: "Visualization", items: ["Chart.js", "SVG Trend Graphs", "Responsive Roster"] }
    ],
    metrics: [
      { label: "Remedial Benchmark", value: "< 40% Threshold" },
      { label: "Evaluations Tracked", value: "CIE 1, 2, 3" },
      { label: "Pipeline Scope", value: "5-Step Automated" }
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
      "/projects/SlowLearners/11.png"
    ],
    objectMeta: {
      icon: "🗃️",
      tag: "SAGE DESK ORGANIZER",
      material: "Matte Sage Green & Ivory Drawers"
    }
  },
  {
    id: "smartattend",
    title: "Attendance System",
    officialName: "Attendance System Using Geofencing and Device ID",
    subtitle: "Anti-Proxy Enterprise Attendance Platform with Dual-Factor Physical Verification",
    academicInfo: "B.M.S. College of Engineering · Dept. of CSE · Guide: Prof. Monisha H M · OOPS with Java",
    overview: "Attendance System Using Geofencing and Device ID is an anti-proxy enterprise attendance platform developed using Object-Oriented Programming (OOPS) principles in Java Spring Boot. It guarantees authentic lecture presence by combining mathematical Haversine spherical GPS geofencing with 1-student-1-device hardware ID binding.",
    problem: "Pervasive proxy attendance in large lecture halls where absent students have peers sign attendance sheets or share static QR codes across messaging apps.",
    solution: "A multi-factor anti-proxy attendance security platform enforcing spherical Haversine GPS distance calculation (≤ 30m circular classroom geofence), dynamic 30-second expiring session tokens, and strict 1-student-1-device hardware binding.",
    functionalities: [
      "Spherical Haversine Geofencing enforcing strict ≤ 30m classroom radius validation",
      "1-Student = 1-Hardware Device ID binding preventing peer proxy marking",
      "Teacher Service generating dynamic UUID session codes that expire in 30 seconds",
      "Real-Time Presence Verification Ledger with instant faculty CSV attendance export",
      "OOPS-Driven Microservices Architecture (Abstraction, Encapsulation, Dependency Injection)"
    ],
    techStack: [
      { category: "Core Backend", items: ["Java 17+ (OOPS Principles)", "Spring Boot 3.x", "Maven"] },
      { category: "Database & Cloud", items: ["PostgreSQL", "Supabase Cloud Database"] },
      { category: "Location & Client", items: ["Android Geolocation API", "Haversine Spherical Algorithm"] },
      { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"] }
    ],
    metrics: [
      { label: "Classroom Boundary", value: "≤ 30m Radius" },
      { label: "Hardware Binding", value: "1 Device / USN" },
      { label: "Session Expiry", value: "30s Dynamic UUID" }
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
      "/projects/SmartAttendece/8.png"
    ],
    objectMeta: {
      icon: "🎫",
      tag: "ACRYLIC ACCESS BADGE",
      material: "Transparent Acrylic & Woven Ribbon"
    }
  }
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-10 bg-[#FAF6F0] text-[#3D0A18] overflow-hidden select-none">
      
      {/* Subtle paper dotted texture matching portfolio aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#8B1E3F_0.75px,transparent_0.75px)] [background-size:20px_20px]" />

      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#FFFDF9] px-4 py-1.5 rounded-full border border-[#8B1E3F]/20 text-xs text-[#8B1E3F] shadow-sm font-semibold mb-3">
          <span className="w-2 h-2 rounded-full bg-[#8B1E3F] animate-pulse"></span>
          <span>Miniature Physical Objects · Click to Open Case Study</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#3D0A18] tracking-tight">
          Crafted Engineering Works
        </h2>
        <p className="text-sm sm:text-base text-[#7A4555] mt-2 max-w-2xl mx-auto leading-relaxed">
          Five standalone miniature physical artifacts placed directly on my editorial desk. Each object is the UI itself—click any artifact to physically open its case study.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* THE 5 STANDALONE PHYSICAL OBJECTS (NO CARDS AROUND THEM!)                  */}
      {/* TOP ROW: UNISTAY · SHAREBITE · KAFKA                                      */}
      {/* BOTTOM ROW: CIE ANALYZER · ATTENDANCE SYSTEM                              */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* ================= TOP ROW: 3 STANDALONE OBJECTS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-end">
          
          {/* ================= OBJECT 01: UNISTAY (VINTAGE DORM TRUNK) ================= */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[0])}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative"
            style={{ filter: "drop-shadow(0 16px 24px rgba(74, 14, 23, 0.12))" }}
          >
            {/* Arched Leather Carry Handle at Top */}
            <div className="flex justify-center -mb-2 relative z-20">
              <div className="w-20 h-4 rounded-t-lg bg-gradient-to-b from-[#8B1E3F] to-[#5C1329] border border-[#ECC880] shadow-sm flex items-center justify-center">
                <div className="w-14 h-1.5 rounded-full bg-[#ECC880]/60"></div>
              </div>
            </div>

            {/* The Trunk Body Itself */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE8] border-2 border-[#ECC880] p-4 pt-5 shadow-lg overflow-hidden">
              
              {/* Four Champagne Brass Corner Protectors */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-sm pointer-events-none" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] rounded-br-sm pointer-events-none" />

              {/* Stitched Leather Trim Bands */}
              <div className="absolute inset-x-0 top-3 h-1 border-b border-dashed border-[#8B1E3F]/30 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-3 h-1 border-t border-dashed border-[#8B1E3F]/30 pointer-events-none" />

              {/* Hanging Leather Luggage Tag & Key */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ECC880]/30 relative z-10">
                <div className="bg-[#FFFDF9] px-2.5 py-1 rounded shadow-xs border border-[#ECC880]/60 flex items-center gap-1.5">
                  <span className="text-xs">🏷️</span>
                  <div>
                    <div className="text-[10px] font-serif font-bold text-[#8B1E3F] tracking-wide leading-none">UNISTAY</div>
                    <div className="text-[7.5px] font-mono text-[#7A4555] uppercase">BMSCE HOSTEL MGMT</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs">🔑</span>
                  <div className="w-5 h-2.5 rounded-xs bg-gradient-to-r from-[#ECC880] to-[#D4AF37] shadow-xs border border-[#996515]"></div>
                </div>
              </div>

              {/* Mini Authentic Polaroid Dorm Photo with Washi Tape */}
              <div className="relative bg-white p-2 rounded-xl shadow-xs border border-[#E8B4B8]/60 mb-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#FAF5EE] border border-[#ECC880]/40 flex items-center justify-center text-xl shadow-inner">
                  🧳
                </div>
                <div>
                  <div className="text-xs font-serif font-bold text-[#8B1E3F]">Maple Hall &bull; Ensuite</div>
                  <div className="text-[9.5px] text-[#7A4555]">Single / Double / Triple Sharing</div>
                  <div className="text-[8.5px] font-mono text-[#059669] mt-0.5">&check; 1 Student = 1 Room Rule</div>
                </div>
              </div>

              {/* Tiny Physical Brass Plates on Trunk */}
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-[8px] font-bold text-[#3D0A18] mb-2">
                <span className="bg-[#FAF5EE] py-0.5 rounded border border-[#ECC880]/50">HOSTEL</span>
                <span className="bg-[#FAF5EE] py-0.5 rounded border border-[#ECC880]/50">BOOKING</span>
                <span className="bg-[#FAF5EE] py-0.5 rounded border border-[#ECC880]/50">DJANGO</span>
                <span className="bg-[#FAF5EE] py-0.5 rounded border border-[#ECC880]/50">AUTH</span>
              </div>

              {/* Folded Map protruding indicator */}
              <div className="pt-2 border-t border-[#ECC880]/30 flex items-center justify-between text-[9px] font-mono text-[#8B1E3F]">
                <span>📍 Folded Campus Map Inside</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">Unlatch Trunk &rarr;</span>
              </div>

            </div>
          </div>

          {/* ================= OBJECT 02: SHAREBITE (WOODEN BENTO BOX) ================= */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[1])}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative"
            style={{ filter: "drop-shadow(0 16px 24px rgba(61, 10, 24, 0.16))" }}
          >
            {/* The Bento Box Body Itself (Dark Lacquer Wood Grain with Gold Bevels) */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#3D0A18] via-[#2A0610] to-[#1C040A] border-3 border-[#ECC880] p-4 shadow-xl">
              
              {/* Beveled Compartment Grid (NO LITERAL FOOD!) */}
              <div className="space-y-2.5">
                
                {/* Compartment 1: Sprout Outline Chamber */}
                <div className="bg-[#122E22] text-[#F0FDF4] p-2.5 rounded-xl border border-[#34D399]/40 shadow-inner flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🌱</span>
                    <div>
                      <div className="text-[10px] font-serif font-bold text-white">ShareBite</div>
                      <div className="text-[8px] font-mono text-[#34D399] tracking-wider uppercase">SURPLUS FOOD DONATION NGO</div>
                    </div>
                  </div>
                  <span className="text-[8px] bg-[#34D399]/20 text-[#34D399] px-2 py-0.5 rounded-full font-bold">
                    FLUTTER 3
                  </span>
                </div>

                {/* Compartments 2 & 3: Typographic Rice & Typographic Tomato */}
                <div className="grid grid-cols-12 gap-2">
                  
                  {/* Compartment 2: Typographic Rice (Dense tiny words that form rice grain texture) */}
                  <div className="col-span-7 bg-[#FAF7F2] p-2 rounded-xl border border-[#ECC880]/40 flex flex-col justify-between">
                    <div className="text-[8px] font-mono text-[#7A4555] uppercase font-bold tracking-wider mb-1">
                      🍚 Typographic Rice
                    </div>
                    <div className="text-[7.5px] font-mono text-[#8C7A6B] leading-tight select-none opacity-85">
                      PICKUP &bull; DONATION &bull; TRACK &bull; NGO &bull; VERIFY &bull; HOT SLA &bull; RESCUE &bull; FOOD &bull; SURPLUS
                    </div>
                    <div className="mt-1 pt-1 border-t border-[#ECC880]/30 text-[9px] font-serif font-bold text-[#8B1E3F]">
                      12,450+ Meals Logged
                    </div>
                  </div>

                  {/* Compartment 3: Typographic Tomato (Circular cluster of burgundy words) */}
                  <div className="col-span-5 bg-gradient-to-br from-[#4A0E17] to-[#2D0A14] text-[#ECC880] p-2 rounded-xl border border-[#ECC880]/30 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full border border-dashed border-[#ECC880]/50 flex items-center justify-center p-1 text-[6.5px] font-mono text-[#FFFDF9] leading-none text-center">
                      DONOR SURPLUS RESCUE
                    </div>
                    <span className="text-[8px] font-mono text-[#ECC880] mt-1">88+ Shelters</span>
                  </div>

                </div>

                {/* Compartment 4: Phone Outline Chamber with authentic ShareBite app screen */}
                <div className="bg-black/40 p-2 rounded-xl border border-white/10 flex items-center justify-between text-[9px] font-mono text-[#ECC880]">
                  <div className="flex items-center gap-1.5">
                    <span>📱</span>
                    <span>SHAREBITE.mp4 Walkthrough</span>
                  </div>
                  <span className="text-[#34D399] font-bold">15-min SLA ↗</span>
                </div>

              </div>

              {/* Wooden Chopsticks & Sakura Blossom Resting Below Box */}
              <div className="mt-3 pt-2 border-t border-[#ECC880]/30 flex items-center gap-2">
                <div className="h-1 flex-1 bg-gradient-to-r from-[#ECC880] to-[#B8860B] rounded-full"></div>
                <span className="text-xs">🌸</span>
                <div className="h-1 flex-1 bg-gradient-to-r from-[#ECC880] to-[#B8860B] rounded-full"></div>
              </div>

            </div>
          </div>

          {/* ================= OBJECT 03: KAFKA SIMULATOR (EVENT-STREAM MACHINE) ================= */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[2])}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative"
            style={{ filter: "drop-shadow(0 16px 24px rgba(30, 34, 41, 0.15))" }}
          >
            {/* The Machine Chassis Itself (Charcoal Metal, Slate Blue, Champagne Brass) */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#242933] via-[#1B1E26] to-[#14171D] border-2 border-[#ECC880] p-4 text-white shadow-xl">
              
              {/* Top Precision Plate: EVENT -> KEY -> PARTITION */}
              <div className="bg-black/50 p-2 rounded-xl border border-[#ECC880]/40 mb-3 flex items-center justify-between font-mono text-[9px]">
                <div className="text-[#ECC880] font-bold flex items-center gap-1">
                  <span>⚙️</span>
                  <span>EVENT &rarr; KEY &rarr; PARTITION</span>
                </div>
                <span className="text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.5 rounded border border-[#38BDF8]/20">
                  KEY = 5 &bull; 5 % 3 = 2
                </span>
              </div>

              {/* Mechanical Roller Channel with Event Blocks */}
              <div className="bg-[#12151B] p-2.5 rounded-xl border border-white/10 mb-3">
                <div className="text-[8px] font-mono text-white/60 uppercase mb-1.5 flex justify-between">
                  <span>Conveyor Rollers</span>
                  <span>Deterministic Hash</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#ECC880] text-[#14171D] font-mono text-[8.5px] font-bold shadow-xs">
                    order_created
                  </span>
                  <span className="text-white/40 text-[9px]">&rarr;</span>
                  <span className="px-2 py-0.5 rounded bg-[#38BDF8] text-white font-mono text-[8.5px] font-bold shadow-xs">
                    P1 Stream
                  </span>
                </div>
              </div>

              {/* Three Precision Physical Channels: P0, P1, P2 */}
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[8.5px] mb-3">
                <div className="p-1.5 rounded-lg bg-[#334155]/60 border border-[#94A3B8]/30">
                  <div className="text-[#ECC880] font-bold">P0</div>
                  <div className="text-[7px] text-white/70">Orders</div>
                </div>
                <div className="p-1.5 rounded-lg bg-[#334155]/60 border border-[#94A3B8]/30">
                  <div className="text-[#38BDF8] font-bold">P1</div>
                  <div className="text-[7px] text-white/70">Payments</div>
                </div>
                <div className="p-1.5 rounded-lg bg-[#334155]/60 border border-[#94A3B8]/30">
                  <div className="text-[#F472B6] font-bold">P2</div>
                  <div className="text-[7px] text-white/70">Users</div>
                </div>
              </div>

              {/* Chassis Nameplate */}
              <div className="pt-2 border-t border-[#ECC880]/30 flex items-center justify-between text-[9px] font-mono">
                <span className="text-[#ECC880] font-bold">KAFKA SIMULATOR</span>
                <span className="text-white/60 group-hover:text-white transition-colors">Extend Machine &rarr;</span>
              </div>

            </div>
          </div>

        </div>

        {/* ================= BOTTOM ROW: 2 STANDALONE OBJECTS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
          
          {/* ================= OBJECT 04: CIE ANALYZER (SAGE DESK ORGANIZER) ================= */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[3])}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative"
            style={{ filter: "drop-shadow(0 16px 24px rgba(45, 90, 70, 0.12))" }}
          >
            {/* The Sage Organizer Caddy (Matching User Image 1) */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#F4F9F6] to-[#E9F3ED] border-2 border-[#A7F3D0] p-4 pt-5 shadow-lg">
              
              {/* Five Physical Mildliner Markers Protruding from Top Slot */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#A7F3D0]/60">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#D1FAE5] text-[#065F46] font-mono text-[9px] font-bold border border-[#A7F3D0]">
                    🗃️ CIE ANALYZER
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-mono text-[8.5px] font-bold">
                    CIE 1 &bull; 2 &bull; 3
                  </span>
                </div>

                {/* The 5 Protruding Markers */}
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-6 rounded-t bg-[#C4B5FD] text-[6px] font-mono text-center pt-0.5 shadow-2xs" title="ZIP">Z</div>
                  <div className="w-2.5 h-7 rounded-t bg-[#A7F3D0] text-[6px] font-mono text-center pt-0.5 shadow-2xs" title="EXCEL">E</div>
                  <div className="w-2.5 h-5 rounded-t bg-[#FBCFE8] text-[6px] font-mono text-center pt-0.5 shadow-2xs" title="PANDAS">P</div>
                  <div className="w-2.5 h-6 rounded-t bg-[#FDE68A] text-[6px] font-mono text-center pt-0.5 shadow-2xs" title="ANALYSIS">A</div>
                  <div className="w-2.5 h-5 rounded-t bg-[#BAE6FD] text-[6px] font-mono text-center pt-0.5 shadow-2xs" title="DASHBOARD">D</div>
                </div>
              </div>

              {/* Center Compartments: Paper Clip 40% Threshold & Tiny Curve */}
              <div className="grid grid-cols-12 gap-3 items-center mb-3">
                
                {/* 40% Threshold Clip */}
                <div className="col-span-4 bg-white p-2 rounded-xl border border-red-200 shadow-2xs text-center">
                  <span className="text-[8px] font-mono uppercase text-red-600 font-bold block">📎 Paper Clip</span>
                  <div className="text-sm font-serif font-bold text-red-700 my-0.5">&lt; 40%</div>
                  <span className="text-[7.5px] font-mono text-[#7A4555]">Threshold Flag</span>
                </div>

                {/* Tiny Printed Progress Curve */}
                <div className="col-span-8 bg-white p-2 rounded-xl border border-[#A7F3D0] shadow-2xs">
                  <div className="flex justify-between text-[7.5px] font-mono text-[#7A4555] mb-0.5">
                    <span>Longitudinal Evaluation Curve</span>
                    <span className="text-[#059669] font-bold">Chart.js</span>
                  </div>
                  <svg className="w-full h-8" viewBox="0 0 100 25">
                    <line x1="0" y1="18" x2="100" y2="18" stroke="#FCA5A5" strokeDasharray="2,2" strokeWidth="0.8" />
                    <path d="M 5,20 Q 25,6 50,16 T 95,5" fill="none" stroke="#059669" strokeWidth="1.5" />
                    <circle cx="5" cy="20" r="1.5" fill="#059669" />
                    <circle cx="50" cy="16" r="1.5" fill="#059669" />
                    <circle cx="95" cy="5" r="1.5" fill="#059669" />
                  </svg>
                </div>

              </div>

              {/* Bottom Drawer Plate */}
              <div className="pt-2 border-t border-[#A7F3D0]/60 flex items-center justify-between text-[9px] font-mono text-[#065F46]">
                <span>Docker &bull; Headless LibreOffice &bull; Pandas</span>
                <span className="font-bold group-hover:translate-x-1 transition-transform">Pull Drawers &rarr;</span>
              </div>

            </div>
          </div>

          {/* ================= OBJECT 05: ATTENDANCE SYSTEM (ACRYLIC BADGE) ================= */}
          <div 
            onClick={() => setActiveProject(PROJECTS_DATA[4])}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative"
            style={{ filter: "drop-shadow(0 16px 24px rgba(61, 10, 24, 0.14))" }}
          >
            {/* Woven Lanyard Neck Ribbon at Top */}
            <div className="flex justify-center -mb-2 relative z-20">
              <div className="px-4 py-0.5 rounded-t-lg bg-gradient-to-r from-[#E8B4B8] via-[#8B1E3F] to-[#E8B4B8] text-[8px] font-mono font-bold text-white shadow-xs border-t border-x border-[#ECC880]">
                ★ SMARTATTEND ★
              </div>
            </div>

            {/* The Acrylic Badge Body Itself (Matching User Image 2) */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#FFFDF9]/95 via-[#FAF5EE]/95 to-[#F5EBE6]/95 backdrop-blur-md border-2 border-[#ECC880]/80 p-4 shadow-xl overflow-hidden">
              
              {/* Specular Acrylic Light Sheen */}
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/40 rounded-full blur-xl pointer-events-none" />

              {/* Student ID Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#ECC880]/40 relative z-10">
                <div>
                  <div className="text-xs font-serif font-bold text-[#3D0A18]">Attendance System</div>
                  <div className="text-[8px] font-mono text-[#8B1E3F] uppercase">GEOFENCING &bull; DEVICE ID &bull; BMSCE</div>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></div>
                </div>
              </div>

              {/* Circular Sonar Radar & Haversine Formula Display */}
              <div className="grid grid-cols-12 gap-3 items-center mb-3">
                
                {/* Dark Forest Green Radar */}
                <div className="col-span-5 bg-[#0A1F16] p-2 rounded-xl border border-[#34D399]/40 flex flex-col items-center justify-center text-center">
                  <div className="relative w-12 h-12 rounded-full border border-[#34D399]/40 flex items-center justify-center my-0.5">
                    <div className="absolute inset-1 rounded-full border border-dashed border-[#ECC880]/40"></div>
                    <span className="text-xs">📍</span>
                  </div>
                  <span className="text-[7.5px] font-mono text-[#34D399] font-bold">&le; 30m Active</span>
                </div>

                {/* Haversine Math Display */}
                <div className="col-span-7 bg-[#FAF5EE] p-2 rounded-xl border border-[#ECC880]/40 font-mono text-[8px] text-[#3D0A18]">
                  <div className="font-bold text-[#8B1E3F] mb-0.5">Haversine Distance</div>
                  <div className="text-[7.5px] text-[#7A4555] leading-tight">
                    d = 2r &bull; arcsin(&radic;sin&sup2;(&Delta;&phi;/2)...)
                  </div>
                  <div className="mt-1 text-[7.5px] text-[#059669] font-bold">1 USN = 1 Device ID</div>
                </div>

              </div>

              {/* Bottom Plate */}
              <div className="pt-2 border-t border-[#ECC880]/40 flex items-center justify-between text-[9px] font-mono text-[#8B1E3F]">
                <span>Java 17+ &bull; Spring Boot &bull; Supabase</span>
                <span className="font-bold group-hover:translate-x-1 transition-transform">Inspect Badge &rarr;</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* EXPANDED CASE STUDY (IN THE SAME OBJECT WITH 2CM MARGIN)                 */}
      {/* Inset clamp(24px, 3vw, 64px) ensures strict 2cm breathing space          */}
      {/* Warm Ivory Linen background, Champagne Gold borders, Velvet Burgundy     */}
      {/* ========================================================================= */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ padding: "clamp(24px, 3vw, 64px)" }}
        >
          {/* Subtle Scrim leaving portfolio visible */}
          <div 
            onClick={closeModal}
            className="fixed inset-0 bg-[#3D0A18]/40 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* The Same Physical Object Opened Wide */}
          <div className="relative z-10 w-full max-w-5xl max-h-full bg-[#FFFDF9] rounded-3xl border-3 border-[#ECC880] shadow-2xl overflow-y-auto overscroll-contain touch-pan-y flex flex-col scrollbar-thin scrollbar-thumb-[#8B1E3F] scrollbar-track-cream">
            
            {/* Top Bar with Object Metaphor Title & Close Button */}
            <div className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md px-6 py-4 border-b border-[#ECC880]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeProject.objectMeta.icon}</span>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B1E3F] font-bold">
                    {activeProject.objectMeta.tag} &bull; {activeProject.objectMeta.material}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3D0A18] leading-tight">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-[#FAF5EE] hover:bg-[#E8B4B8]/40 border border-[#ECC880] flex items-center justify-center text-[#3D0A18] transition-all shadow-xs"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CASE STUDY CONTENT INSIDE THE OPENED OBJECT */}
            <div className="p-6 sm:p-8 space-y-8 text-[#3D0A18]">
              
              {/* Academic & Official Subtitle Banner */}
              <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#ECC880]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#3D0A18]">{activeProject.officialName}</h4>
                  <p className="text-xs text-[#7A4555] font-mono mt-0.5">{activeProject.academicInfo}</p>
                </div>
                <div className="flex items-center gap-2">
                  {activeProject.liveUrl && (
                    <a 
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#4A0E17] text-[#FFFDF9] text-xs font-bold shadow-xs hover:bg-[#60121F] flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live App ↗</span>
                    </a>
                  )}
                  <a 
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-white text-[#3D0A18] border border-[#ECC880] text-xs font-bold shadow-xs hover:bg-[#FAF5EE] flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>

              {/* 1. WHAT THE PROJECT IS (Problem & Purpose) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-[#ECC880]/40 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#8B1E3F] mb-2">
                    <span>⚠️</span>
                    <span>The Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7A4555] leading-relaxed">
                    {activeProject.problem}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#ECC880]/40 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#059669] mb-2">
                    <span>💡</span>
                    <span>The Technical Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7A4555] leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* 2. MAIN FUNCTIONALITIES (Bulleted Core Features from Report) */}
              <div className="bg-white p-5 rounded-2xl border border-[#ECC880]/40 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#8B1E3F] mb-3">
                  <span>⚙️</span>
                  <span>Main Functionalities &amp; Architecture Modules</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProject.functionalities.map((func, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#3D0A18] bg-[#FAF5EE] p-2.5 rounded-xl border border-[#ECC880]/20">
                      <span className="text-[#8B1E3F] font-bold mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{func}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. TECHNOLOGY STACK (Categorized Badges) */}
              <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#ECC880]/40">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#8B1E3F] mb-3">
                  🛠️ Complete Technology Stack
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {activeProject.techStack.map((group, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-[#ECC880]/30 shadow-2xs">
                      <div className="text-[10px] font-mono uppercase font-bold text-[#7A4555] mb-1.5">{group.category}</div>
                      <div className="flex flex-wrap gap-1">
                        {group.items.map((item, itemIdx) => (
                          <span key={itemIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF5EE] text-[#3D0A18] border border-[#ECC880]/30">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. REAL MEDIA & DEMONSTRATION */}
              {activeProject.mediaType === "video" ? (
                /* ShareBite Real Video Player */
                <div className="bg-white p-5 rounded-2xl border border-[#ECC880]/40 shadow-xs">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="font-bold text-[#8B1E3F] flex items-center gap-1.5">
                      <span>🎬</span>
                      <span>Authentic Mobile App Walkthrough Video (SHAREBITE.mp4)</span>
                    </span>
                    <button 
                      onClick={toggleMute}
                      className="px-2.5 py-1 rounded bg-[#FAF5EE] text-[#3D0A18] hover:bg-[#E8B4B8]/30 border border-[#ECC880]/40 font-medium flex items-center gap-1 text-[11px]"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isMuted ? "Unmute Audio" : "Muted"}</span>
                    </button>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-inner border border-[#ECC880]/40">
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
              ) : (
                /* Authentic Screenshot Gallery */
                <div className="bg-white p-5 rounded-2xl border border-[#ECC880]/40 shadow-xs">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="font-bold text-[#8B1E3F] flex items-center gap-1.5">
                      <span>📸</span>
                      <span>Authentic Project Screenshots ({activeSlide + 1} / {activeProject.screenshots.length})</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : activeProject.screenshots.length - 1))}
                        className="w-7 h-7 rounded-full bg-[#FAF5EE] hover:bg-[#E8B4B8]/40 border border-[#ECC880] flex items-center justify-center text-[#3D0A18]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setActiveSlide((prev) => (prev < activeProject.screenshots.length - 1 ? prev + 1 : 0))}
                        className="w-7 h-7 rounded-full bg-[#FAF5EE] hover:bg-[#E8B4B8]/40 border border-[#ECC880] flex items-center justify-center text-[#3D0A18]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Active Slide */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#FAF5EE] border border-[#ECC880]/40 mb-3 shadow-inner">
                    <Image 
                      src={activeProject.screenshots[activeSlide]} 
                      alt="Project Screenshot" 
                      fill 
                      className="object-contain" 
                    />
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {activeProject.screenshots.map((s, idx) => (
                      <div 
                        key={s}
                        onClick={() => setActiveSlide(idx)}
                        className={`relative w-16 h-10 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          idx === activeSlide ? "border-[#8B1E3F] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={s} alt={`Slide ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. VERIFIED REPOSITORIES & ACTION FOOTER */}
              <div className="pt-4 border-t border-[#ECC880]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#7A4555]">
                <div className="font-mono">
                  <span>Source Verification &bull; Tested on Node.js / Python / Java</span>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#4A0E17] text-[#FFFDF9] font-bold shadow-xs hover:bg-[#60121F] transition-all flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Source Code ↗</span>
                  </a>
                  <button 
                    onClick={closeModal}
                    className="px-4 py-2 rounded-xl bg-[#FAF5EE] border border-[#ECC880] text-[#3D0A18] font-bold hover:bg-[#E8B4B8]/30 transition-all"
                  >
                    Close Object
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
