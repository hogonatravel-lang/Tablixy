import { Coffee, Pizza, Wine, UtensilsCrossed } from "lucide-react";

const Logos = () => {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 uppercase tracking-widest text-xs font-bold mb-12">
          Trusted by modern venues
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6" />
            <span className="text-xl font-black uppercase tracking-tighter">
              Brew & Co
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6" />
            <span className="text-xl font-black uppercase tracking-tighter">
              Noodl
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Wine className="w-6 h-6" />
            <span className="text-xl font-black uppercase tracking-tighter">
              The Cellar
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Pizza className="w-6 h-6" />
            <span className="text-xl font-black uppercase tracking-tighter">
              Crust
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Logos;
