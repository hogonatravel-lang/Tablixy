import { Hotel, User, Hash, Copy, Check } from "lucide-react";
import { useState } from "react";

const Topbar = ({ profile, hotel }) => {
  const [copied, setCopied] = useState(false);

  const copyHotelId = async () => {
    if (!hotel?.hotelId) return;
    await navigator.clipboard.writeText(hotel.hotelId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="topbar">
        {/* Left Section */}
        <div className="topbar-left">
          <Hotel size={22} className="icon-green" />

          <div>
            <div className="hotel-name">
              {hotel?.hotelName || "Hotel"}
            </div>

            {hotel?.hotelId && (
              <button
                className="hotel-id"
                onClick={copyHotelId}
                title="Click to copy Hotel ID"
              >
                <Hash size={14} />
                <span>{hotel.hotelId}</span>
                {copied ? (
                  <Check size={14} className="copied" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          <User size={18} />
          <span>
            Welcome,{" "}
            <strong>
              {profile?.name ||
                (profile?.role === "manager" ? "Manager" : profile?.role)}
            </strong>
          </span>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(0,255,102,0.4);
          background: #0b1a10;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hotel-name {
          font-size: 1rem;
          font-weight: 600;
        }

        .hotel-id {
          margin-top: 2px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px 0;
        }

        .hotel-id:hover {
          color: #00ff66;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
        }

        .icon-green {
          color: #00ff66;
        }

        .copied {
          color: #00ff66;
        }

        /* Mobile Optimization */
        @media (max-width: 640px) {
          .hotel-name {
            font-size: 0.9rem;
          }

          .topbar-right span {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Topbar;
