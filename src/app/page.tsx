import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CommandsSection from "@/components/sections/CommandsSection";
import FaqSection from "@/components/sections/FaqSection";
import TeamSection from "@/components/sections/TeamSection"; // Added TeamSection
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-[#07070a] min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CommandsSection />
      <TeamSection /> {/* Added TeamSection */}
      <FaqSection />
      <Footer />
    </main>
  );
}
