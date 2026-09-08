import BookshelfHero from "@/components/sections/BookshelfHero";
import IdentitySection from "@/components/sections/IdentitySection";
import EnvelopeGallery from "@/components/sections/EnvelopeGallery";
import FramedCertifications from "@/components/sections/FramedCertifications";
import HorizontalCertificates from "@/components/sections/HorizontalCertificates";
import JourneyPath from "@/components/sections/JourneyPath";
import TechStackBox from "@/components/sections/TechStackBox";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-cream text-espresso overflow-hidden">
      {/* 1. Bookshelf → Falling Book → Book Opens → Portfolio Emergence */}
      <BookshelfHero />

      {/* 2. KRITIKA + blurred PORTFOLIO Background */}
      <IdentitySection />

      {/* 3. Angled Envelope (Left) → Images Spilling (Right) */}
      <EnvelopeGallery />

      {/* 4. Framed Certificates (Left) → Title (Right) */}
      <FramedCertifications />

      {/* 5. Other Certificates & Workshops (Horizontal Scroll) */}
      <HorizontalCertificates />

      {/* 6. Personal Journey (45° Diagonal Stone Path → Cloud) */}
      <JourneyPath />

      {/* 7. Tech Stack (3D Box with Scroll-Driven Camera Rotation) */}
      <TechStackBox />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-blush bg-cream text-center">
        <p className="font-serif italic text-burgundy text-lg">
          Kritika Panwar &bull; Editorial Scrapbook Portfolio
        </p>
        <p className="text-sm font-mono text-mauve mt-2">
          Designed with 🌸 Dusty Pink &times; Burgundy &bull; Built with Next.js, GSAP &amp; Three.js
        </p>
      </footer>
    </main>
  );
}
