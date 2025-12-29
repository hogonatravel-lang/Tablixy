
import React from 'react';
import { QrCode, Utensils, ShoppingBag, CreditCard, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: <QrCode className="w-6 h-6 text-[#00ff66]" />,
    title: "Scan QR",
    desc: "Instant access via camera, no app needed."
  },
  {
    icon: <Utensils className="w-6 h-6 text-[#00ff66]" />,
    title: "View Menu",
    desc: "Visual menu with photos and modifiers."
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-[#00ff66]" />,
    title: "Order",
    desc: "Direct to kitchen. No errors."
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#00ff66]" />,
    title: "Pay",
    desc: "Apple Pay, Google Pay, or Card."
  },
  {
    icon: <ThumbsUp className="w-6 h-6 text-[#00ff66]" />,
    title: "Feedback",
    desc: "Rate the experience instantly."
  }
];

const GuestExperience = () => {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-b from-transparent to-[#040e09]">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h3 className="text-[#00ff66] font-bold text-sm tracking-widest uppercase mb-4">The Guest Experience</h3>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Effortless for your Guests</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          No apps to download. No waiting for servers. Just a seamless dining experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="group bg-[#0c1d12] border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-[#122b1b] transition-all hover:-translate-y-1 relative"
          >
            <div className="w-16 h-16 bg-black/30 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h4 className="text-xl font-bold mb-3">{step.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            
            {/* Arrow connector for desktop */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuestExperience;
