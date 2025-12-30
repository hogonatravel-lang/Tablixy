import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Staff = ({ hotelId }) => {
  const [staff, setStaff] = useState([]);

  useEffect(()=>{
    const fetchStaff = async () => {
      const snap = await getDocs(collection(db,"staff"));
      setStaff(snap.docs.map(d=>({id:d.id, ...d.data()})).filter(s=>s.hotelId===hotelId));
    };
    fetchStaff();
  },[hotelId]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Staff Management</h2>
      {staff.map(s=>(
        <div key={s.id} className="staff-card">{s.name}</div>
      ))}

      <style>{`
        .staff-card { padding:8px; margin-bottom:6px; background:#05100a; border-radius:6px; }
      `}</style>
    </div>
  );
};

export default Staff;
