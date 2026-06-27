import FeaturesSection from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import LogoCloud from "../components/landing/LogoCloud";
// import FeaturesGrid from "../components/landing/FeaturesGrid";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-surface text-on-surface flex flex-col items-center justify-start w-full">
      <HeroSection />
      <LogoCloud />
      <FeaturesSection />
    </main>
  );
}