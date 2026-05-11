// components/landing/hero/HeroSection.tsx
"use client";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-full mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[60%] h-[80%] rounded-full bg-indigo-300 opacity-30 blur-3xl z-0" />

      <div className="absolute bottom-0 left-0 -ml-[10%] -mb-[10%] w-[40%] h-[60%] rounded-full bg-slate-200 opacity-50 blur-3xl z-0" />

      <HeroContent />
      <HeroVisual />
    </section>
  );
}