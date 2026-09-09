import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Kritika Panwar | Creative Developer Portfolio",
  description:
    "Interactive editorial scrapbook portfolio of Kritika Panwar - Full Stack Developer & Creative Technologist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-dustyRose selection:text-white hero-active">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
