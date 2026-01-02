import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const Staff = ({ hotelId }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "staff"));

    const filtered = snap.docs
      .map(d => ({
        id: d.id,
        verified: false,
        daysWorked: 0,
        leavesTaken: 0,
        ...d.data(),
      }))
      .filter(s => s.hotelId === hotelId);

    setStaff(filtered);
    setLoading(false);
  };

  useEffect(() => {
    if (hotelId) fetchStaff();
  }, [hotelId]);

  const toggleVerify = async (staffId, current) => {
    await updateDoc(doc(db, "staff", staffId), {
      verified: !current,
    });

    setStaff(prev =>
      prev.map(s =>
        s.id === staffId ? { ...s, verified: !current } : s
      )
    );
  };

  if (loading) return <p className="text-gray-400">Loading staff...</p>;

  return (
    <div className="staff-wrapper">
      <h2 className="title">Staff Management</h2>

      {staff.length === 0 && (
        <p className="empty">No staff found for this hotel</p>
      )}

      <div className="staff-grid">
        {staff.map(s => (
          <div key={s.id} className="staff-card">
            <div className="top">
              <div>
                <h3>{s.name}</h3>
                <span className="role">{s.role || "staff"}</span>
              </div>

              {/* Verify Toggle */}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={s.verified}
                  onChange={() => toggleVerify(s.id, s.verified)}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="stats">
              <div>
                <p className="label">Days Worked</p>
                <p className="value">{s.daysWorked}</p>
              </div>
              <div>
                <p className="label">Leaves</p>
                <p className="value">{s.leavesTaken}</p>
              </div>
            </div>

            <div className={`status ${s.verified ? "ok" : "pending"}`}>
              {s.verified ? "Verified" : "Not Verified"}
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style>{`
        .staff-wrapper { color:white; }
        .title { font-size:1.5rem; margin-bottom:1rem; }

        .empty { color:#9ca3af; }

        .staff-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
          gap:1rem;
        }

        .staff-card {
          background:#05100a;
          padding:1rem;
          border-radius:16px;
          box-shadow:0 10px 30px rgba(0,0,0,.4);
        }

        .top {
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .role {
          font-size:12px;
          color:#9ca3af;
        }

        .stats {
          display:flex;
          justify-content:space-between;
          margin-top:12px;
        }

        .label {
          font-size:12px;
          color:#9ca3af;
        }

        .value {
          font-size:18px;
          font-weight:600;
        }

        .status {
          margin-top:10px;
          padding:6px;
          border-radius:8px;
          text-align:center;
          font-size:13px;
          font-weight:600;
        }

        .status.ok {
          background:rgba(0,255,102,.15);
          color:#00ff66;
        }

        .status.pending {
          background:rgba(255,255,255,.08);
          color:#facc15;
        }

        /* Toggle Switch */
        .switch {
          position:relative;
          width:42px;
          height:22px;
        }

        .switch input {
          display:none;
        }

        .slider {
          position:absolute;
          cursor:pointer;
          inset:0;
          background:#374151;
          border-radius:999px;
          transition:.3s;
        }

        .slider:before {
          content:"";
          position:absolute;
          height:16px;
          width:16px;
          left:3px;
          top:3px;
          background:white;
          border-radius:50%;
          transition:.3s;
        }

        input:checked + .slider {
          background:#00ff66;
        }

        input:checked + .slider:before {
          transform:translateX(20px);
        }
      `}</style>
    </div>
  );
};

export default Staff;
