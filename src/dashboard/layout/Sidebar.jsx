const Sidebar = ({ profile, activeTab, setActiveTab }) => {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "items", label: "Item Management", role: "manager" },
    { key: "staff", label: "Staff Management", role: "manager" },
    { key: "qr", label: "QR Codes", role: "manager" },
    { key: "orders", label: "Orders" },
    { key: "settings", label: "Settings", role: "manager" },
  ];

  return (
    <div className="w-64 bg-[#05100a] p-4 flex flex-col gap-2">
      {tabs.map(tab => {
        if (tab.role && tab.role !== profile.role) return null;
        return (
          <button
            key={tab.key}
            className={`py-2 px-4 rounded ${activeTab === tab.key ? "bg-[#00ff66] text-black" : "text-white/70"}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
