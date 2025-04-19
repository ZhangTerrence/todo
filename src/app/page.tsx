import Navbar from "@/components/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";


export default async function LandingPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <main className="grid place-content-center grow">
        <HeroSection/>
        <FeaturesSection/>
        <Footer/>
      </main>
    </div>
  );
}
