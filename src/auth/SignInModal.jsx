import { useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { User, Users, Hotel } from "lucide-react";

const generateHotelId = () =>
  "HTL-" + Math.random().toString(36).substring(2, 8).toUpperCase();

const roles = [
  { key: "manager", label: "Manager", icon: <Hotel size={28} /> },
  { key: "staff", label: "Staff", icon: <Users size={28} /> },
  { key: "guest", label: "Guest", icon: <User size={28} /> },
];

const SignInModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [manager, setManager] = useState({
    hotelName: "",
    ownerName: "",
    tables: "",
    location: "",
  });

  const [staff, setStaff] = useState({
    name: "",
    hotelId: "",
  });

  /* ---------------- AUTH ---------------- */
  const handleAuth = async () => {
    if (!role) return setError("Please select a role");

    setLoading(true);
    setError("");

    try {
      let userCred;
      try {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      } catch {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      }

      const uid = userCred.user.uid;
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          email,
          role,
          createdAt: serverTimestamp(),
        });

        if (role === "manager" || role === "staff") {
          setStep(3);
        } else {
          navigate("/coming-soon/guest");
        }
      } else {
        const dbRole = snap.data().role;
        dbRole === "manager"
          ? navigate("/dashboard")
          : navigate(`/coming-soon/${dbRole}`);
      }
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  /* ---------------- ONBOARDING ---------------- */
  const submitOnboarding = async () => {
    setLoading(true);
    setError("");

    try {
      const uid = auth.currentUser.uid;

      if (role === "manager") {
        const hotelId = generateHotelId();

        await setDoc(doc(db, "hotels", hotelId), {
          ...manager,
          hotelId,
          managerUid: uid,
          tables: Number(manager.tables),
          status: false,
          createdAt: serverTimestamp(),
        });

        await setDoc(doc(db, "users", uid), { role, hotelId }, { merge: true });
        navigate("/dashboard");
      }

      if (role === "staff") {
        const hotelSnap = await getDoc(doc(db, "hotels", staff.hotelId));
        if (!hotelSnap.exists()) throw new Error("Invalid Hotel ID");

        await setDoc(doc(db, "staff", uid), {
          ...staff,
          verified: false, // ✅ REQUIRED FIELD
          createdAt: serverTimestamp(),
        });

        await setDoc(
          doc(db, "users", uid),
          { role, hotelId: staff.hotelId },
          { merge: true }
        );

        navigate("/coming-soon/staff");
      }
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-card {
          background: #05100a;
          border-radius: 20px;
          padding: 26px;
          width: 100%;
          max-width: 440px;
          color: white;
        }

        .role-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
          margin-top: 20px;
        }

        .role-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 18px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-card.active {
          border-color: #00ff66;
          background: rgba(0,255,102,0.1);
        }

        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          margin-bottom: 14px;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: #00ff66;
          color: #000;
          font-weight: 700;
          cursor: pointer;
        }

        .error {
          color: #ff6b6b;
          margin-top: 12px;
          font-size: 14px;
        }
      `}</style>

      <div className="modal-backdrop">
        <div className="modal-card">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">Select your role</h2>
              <p className="text-sm text-white/60">Choose how you want to continue</p>

              <div className="role-grid">
                {roles.map(r => (
                  <div
                    key={r.key}
                    className={`role-card ${role === r.key ? "active" : ""}`}
                    onClick={() => {
                      setRole(r.key);
                      setStep(2);
                    }}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="mb-3">Continue as {role}</h3>
              <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
              <button className="btn" onClick={handleAuth}>
                Continue
              </button>
            </>
          )}

          {step === 3 && role === "manager" && (
            <>
              <h3>Hotel Setup</h3>
              <input className="input" placeholder="Hotel Name" onChange={e=>setManager({...manager, hotelName:e.target.value})} />
              <input className="input" placeholder="Owner Name" onChange={e=>setManager({...manager, ownerName:e.target.value})} />
              <input className="input" type="number" placeholder="Tables" onChange={e=>setManager({...manager, tables:e.target.value})} />
              <input className="input" placeholder="Location" onChange={e=>setManager({...manager, location:e.target.value})} />
              <button className="btn" onClick={submitOnboarding}>Create Hotel</button>
            </>
          )}

          {step === 3 && role === "staff" && (
            <>
              <h3>Join Hotel</h3>
              <input className="input" placeholder="Your Name" onChange={e=>setStaff({...staff, name:e.target.value})} />
              <input className="input" placeholder="Hotel ID" onChange={e=>setStaff({...staff, hotelId:e.target.value})} />
              <button className="btn" onClick={submitOnboarding}>Request Access</button>
            </>
          )}

          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default SignInModal;
