import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuestExperience from './components/GuestExperience';
import ManagerSection from './components/ManagerSection';
import Logos from './components/Logos';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-[#00ff66] selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <Hero />
        <GuestExperience />
        <ManagerSection />
        <Logos />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
