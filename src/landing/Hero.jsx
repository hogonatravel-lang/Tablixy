
import React from 'react';
import { Play, Rocket, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Revolutionize<br />
            Dining with<br />
            <span className="text-[#00ff66]">Scan & Order</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            The all-in-one QR platform for modern restaurants. Increase table turnover and boost average order value by 20%. No app download required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button className="flex items-center gap-2 bg-[#00ff66] text-[#05100a] px-8 py-4 rounded-md font-bold hover:bg-[#00e65c] transition-all group w-full sm:w-auto justify-center">
              <Rocket className="w-5 h-5 group-hover:animate-bounce" />
              Get Started
            </button>
            <button className="flex items-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-md font-bold hover:bg-white/10 transition-all w-full sm:w-auto justify-center">
              <Play className="w-5 h-5" />
              View Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="w-5 h-5 text-[#00ff66]" />
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="w-5 h-5 text-[#00ff66]" />
              14-day free trial
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div className="flex-1 relative w-full max-w-2xl">
          {/* Dashboard Mockup */}
          <div className="bg-[#0c1d12] rounded-2xl border border-white/5 p-6 shadow-2xl overflow-hidden relative">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 p-4 rounded-xl">
                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Today Revenue</p>
                <p className="text-2xl font-bold">$2,840</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">Active Tables</p>
                <p className="text-2xl font-bold">24/30</p>
                <p className="text-xs text-[#00ff66] mt-1">Peak hours</p>
              </div>
            </div>

            <div className="h-32 flex items-end gap-2 px-2">
              {[40, 60, 30, 80, 100, 70, 45].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 4 ? 'bg-[#00ff66]' : 'bg-white/10'}`} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Floating Phone Mockup */}
          <div className="absolute -left-12 bottom-[-10%] md:bottom-[-20%] w-[240px] md:w-[280px] bg-black rounded-[40px] border-[8px] border-[#222] shadow-2xl p-2 z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 hidden md:block">
            <div className="bg-white h-full w-full rounded-[32px] overflow-hidden flex flex-col">
              <div className="h-6 w-1/3 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20" />
              <img src="https://picsum.photos/seed/burger/400/600" alt="App Preview" className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-black font-bold text-xl mb-1">Classic Cheeseburger</h3>
                  <p className="text-gray-500 text-xs mb-4">Prime beef, cheddar, lettuce, tomato, special sauce.</p>
                  <div className="bg-[#00ff66] text-black text-center py-2 rounded-lg font-bold text-sm shadow-lg mb-2">
                    ADD TO CART
                  </div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4].map(dot => <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot === 1 ? 'bg-black/20' : 'bg-black/5'}`} />)}
                  </div>
                </div>
                <button className="bg-[#00ff66] text-black w-full py-4 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(0,255,102,0.3)] mt-auto">
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
