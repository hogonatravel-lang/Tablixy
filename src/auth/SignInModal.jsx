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

const generateHotelId = () =>
  "HTL-" + Math.random().toString(36).substring(2, 8).toUpperCase();

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
  // NEW USER
  await setDoc(userRef, {
    email,
    role,
    createdAt: serverTimestamp(),
  });

  if (role === "manager" || role === "staff") {
    setStep(3); // onboarding needed
  } else {
    navigate("/coming-soon/guest");
  }

} else {
  // EXISTING USER → READ ROLE FROM DB
  const dbRole = snap.data().role;

  if (dbRole === "manager") {
    navigate("/dashboard");
  } else {
    navigate(`/coming-soon/${dbRole}`);
  }
}
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

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

        await setDoc(
          doc(db, "users", uid),
          { role, hotelId },
          { merge: true }
        );

        navigate("/dashboard");
      }

      if (role === "staff") {
        const hotelSnap = await getDoc(doc(db, "hotels", staff.hotelId));
        if (!hotelSnap.exists()) throw new Error("Invalid Hotel ID");

        await setDoc(doc(db, "staff", uid), {
          ...staff,
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
      {/* COMPONENT-ONLY CSS */}
      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-card {
          background: #05100a;
          border-radius: 18px;
          padding: 24px;
          width: 100%;
          max-width: 420px;
          color: white;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }

        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          margin-bottom: 14px;
          outline: none;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          background: #00ff66;
          color: #000;
          font-weight: 700;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .btn:disabled {
          opacity: 0.6;
        }

        .close-btn {
          float: right;
          cursor: pointer;
          opacity: 0.7;
        }

        .error {
          color: #ff6b6b;
          margin-top: 12px;
          font-size: 14px;
        }
      `}</style>

      <div className="modal-backdrop">
        <div className="modal-card">
          <span onClick={onClose} className="close-btn">✕</span>

          {step === 1 && (
            <>
              <h2>Select Role</h2>
              {["manager", "staff", "guest"].map(r => (
                <button
                  key={r}
                  className="btn"
                  onClick={() => {
                    setRole(r);
                    setStep(2);
                  }}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <h3>Continue as {role}</h3>
              <input className="input" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
              <button className="btn" onClick={handleAuth} disabled={loading}>
                {loading ? "Please wait..." : "Continue"}
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
              <button className="btn" onClick={submitOnboarding}>Join</button>
            </>
          )}

          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default SignInModal;
