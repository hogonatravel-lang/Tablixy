import Navbar from "./Navbar";
import Hero from "./Hero";
import GuestExperience from "./GuestExperience";
import ManagerSection from "./ManagerSection";
import Logos from "./Logos";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <GuestExperience />
        <ManagerSection />
        <Logos />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
