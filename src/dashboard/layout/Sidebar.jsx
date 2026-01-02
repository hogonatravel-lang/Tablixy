import {
  LayoutDashboard,
  Utensils,
  Users,
  QrCode,
  ClipboardList,
  Settings,
} from "lucide-react";

const tabs = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "items", label: "Items", icon: Utensils, role: "manager" },
  { key: "staff", label: "Staff", icon: Users, role: "manager" },
  { key: "qr", label: "QR Codes", icon: QrCode, role: "manager" },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "settings", label: "Settings", icon: Settings, role: "manager" },
];

const Sidebar = ({ profile, activeTab, setActiveTab }) => {
  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <aside className="sidebar-desktop">
        <h1 className="logo">Tablexy</h1>

        {tabs.map(tab => {
          if (tab.role && tab.role !== profile.role) return null;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              className={`nav-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </aside>

      {/* ===== Mobile Bottom Tab ===== */}
      <nav className="sidebar-mobile">
        {tabs.map(tab => {
          if (tab.role && tab.role !== profile.role) return null;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              className={`mobile-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </nav>

      {/* ===== CSS ===== */}
      <style>{`
        /* Desktop Sidebar */
        .sidebar-desktop {
          width: 240px;
          background: #05100a;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-height: 100vh;
        }

        .logo {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #00ff66;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          color: rgba(255,255,255,0.7);
          background: transparent;
          cursor: pointer;
          border: none;
          transition: all .25s ease;
        }

        .nav-btn:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .nav-btn.active {
          background: #00ff66;
          color: #000;
          font-weight: 600;
        }

        /* Mobile Bottom Tab */
        .sidebar-mobile {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #05100a;
          display: none;
          justify-content: space-around;
          padding: 10px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          z-index: 1000;
        }

        .mobile-btn {
          color: rgba(255,255,255,0.6);
          background: transparent;
          border: none;
          padding: 6px;
        }

        .mobile-btn.active {
          color: #00ff66;
        }

        /* Responsive Rules */
        @media (max-width: 768px) {
          .sidebar-desktop {
            display: none;
          }

          .sidebar-mobile {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
