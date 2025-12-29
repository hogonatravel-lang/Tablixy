import {
  ArrowRight,
  Check,
  ListTodo,
  BarChart3,
  CookingPot,
  Wallet,
} from "lucide-react";

const managerFeatures = [
  {
    icon: <ListTodo className="w-6 h-6 text-[#00ff66]" />,
    title: "Menu Management",
    desc: "Update prices, hide out-of-stock items, and add specials instantly across all tables from your phone.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#00ff66]" />,
    title: "Real-time Analytics",
    desc: "Visualize peak hours, top-selling items, and revenue streams live. Make data-driven decisions.",
  },
  {
    icon: <CookingPot className="w-6 h-6 text-[#00ff66]" />,
    title: "Kitchen Display",
    desc: "Send orders directly to KDS screens or printers. Color-coded timers keep the line moving fast.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-[#00ff66]" />,
    title: "Payment Monitoring",
    desc: "See which tables have paid and which are open. Prevent walk-outs with instant status updates.",
  },
];

const ManagerSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-[#05100a]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        {/* LEFT CONTENT */}
        <div className="lg:w-1/2">
          <h3 className="text-[#00ff66] font-bold text-sm tracking-widest uppercase mb-4">
            For Managers
          </h3>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Powerful for You
          </h2>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Regain control of your restaurant floor. Update menus in seconds,
            track every penny, and understand your customers like never before.
          </p>

          <ul className="space-y-6 mb-12">
            {[
              "Reduce staffing costs by 30%",
              "Eliminate order errors",
              "Collect customer emails automatically",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-4 text-white font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-[#00ff66]/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#00ff66]" />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <button className="flex items-center gap-2 bg-[#0c1d12] border border-white/10 text-white px-8 py-4 rounded-md font-bold hover:bg-[#122b1b] transition-all group">
            Explore Manager Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* RIGHT FEATURES GRID */}
        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {managerFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#0c1d12] border border-white/5 p-8 rounded-2xl hover:border-[#00ff66]/30 transition-all"
            >
              <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h4 className="text-xl font-bold mb-4">
                {feature.title}
              </h4>

              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ManagerSection;
