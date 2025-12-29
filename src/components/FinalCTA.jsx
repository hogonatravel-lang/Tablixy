
import React from 'react';

const FinalCTA= () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff66]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          Ready to modernize your restaurant?
        </h2>
        <p className="text-gray-400 text-xl mb-12 leading-relaxed">
          Join 500+ venues using Tablixy to streamline operations and delight guests.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button className="bg-[#00ff66] text-[#05100a] px-10 py-5 rounded-md font-extrabold hover:bg-[#00e65c] transition-all transform hover:scale-105 shadow-xl shadow-[#00ff66]/10 w-full sm:w-auto">
            Start 14-Day Free Trial
          </button>
          <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-md font-extrabold hover:bg-white/10 transition-all w-full sm:w-auto">
            Book a Demo
          </button>
        </div>
        
        <p className="text-gray-500 text-sm font-medium">
          No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
