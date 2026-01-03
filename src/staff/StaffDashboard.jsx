import { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import {
  Clock,
  ClipboardList,
  ChevronDown,
  LogOut,
  ListOrdered
} from "lucide-react";

const StaffDashboard = ({ hotelId, staff }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [checkedIn, setCheckedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const uid = auth.currentUser.uid;
  const today = new Date().toISOString().split("T")[0];

  /* ---------------- ORDERS ---------------- */
  useEffect(() => {
    if (!hotelId) return;

    const q = query(
      collection(db, "orders"),
      where("hotelId", "==", hotelId)
    );

    const unsub = onSnapshot(q, snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [hotelId]);

  /* ---------------- ATTENDANCE LOAD ---------------- */
  useEffect(() => {
    const loadAttendance = async () => {
      const ref = doc(db, "staffAttendance", uid, "days", today);
      const snap = await getDoc(ref);
      if (snap.exists()) setCheckedIn(true);
    };
    loadAttendance();
  }, [uid, today]);

  /* ---------------- CLICK OUTSIDE DROPDOWN ---------------- */
  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- ATTENDANCE ---------------- */
  const checkIn = async () => {
    await setDoc(
      doc(db, "staffAttendance", uid, "days", today),
      { checkIn: serverTimestamp() }
    );
    setCheckedIn(true);
  };

  const checkOut = async () => {
    await updateDoc(
      doc(db, "staffAttendance", uid, "days", today),
      { checkOut: serverTimestamp() }
    );
    setCheckedIn(false);
  };

  /* ---------------- ORDER STATUS ---------------- */
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    await signOut(auth);
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-[#0b1a10] text-white p-4">

      {/* ================= TOP BAR ================= */}
      <div className="sticky top-0 bg-[#0b1a10] z-10 pb-4 mb-4 border-b border-white/10">
        <div className="flex justify-between items-center">

          {/* PROFILE */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 active:scale-95 transition"
            >
              <div className="w-9 h-9 rounded-full bg-green-400 text-black flex items-center justify-center font-bold">
                {staff?.name?.[0]}
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold">{staff?.name}</p>
                <p className="text-xs text-white/60 flex items-center gap-1">
                  <Clock size={12} />
                  {checkedIn ? "On Duty" : "Off Duty"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`transition ${showMenu ? "rotate-180" : ""}`}
              />
            </button>

            {/* DROPDOWN */}
            {showMenu && (
              <div className="absolute mt-3 w-44 rounded-xl bg-black/90 backdrop-blur border border-white/10 shadow-xl animate-in">
                <button
                  className="w-full px-4 py-3 flex items-center gap-2 text-sm hover:bg-white/10 transition"
                >
                  <ListOrdered size={16} />
                  Order List
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 flex items-center gap-2 text-sm text-red-400 hover:bg-white/10 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          <ClipboardList size={22} className="text-green-400" />
        </div>
      </div>

      {/* ================= ATTENDANCE ================= */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={checkIn}
          disabled={checkedIn}
          className={`py-3 rounded-xl font-semibold transition ${
            checkedIn
              ? "bg-white/10 text-white/40"
              : "bg-green-400 text-black hover:scale-[1.02]"
          }`}
        >
          Check In
        </button>

        <button
          onClick={checkOut}
          disabled={!checkedIn}
          className={`py-3 rounded-xl font-semibold transition ${
            !checkedIn
              ? "bg-white/10 text-white/40"
              : "bg-red-500 hover:scale-[1.02]"
          }`}
        >
          Check Out
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {["all", "new", "preparing", "ready"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === f
                ? "bg-green-400 text-black"
                : "bg-white/10 text-white/70"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= ORDERS ================= */}
      <div className="space-y-4">
        {filteredOrders.map(o => (
          <div
            key={o.id}
            className="bg-black/50 p-4 rounded-2xl hover:scale-[1.01] transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Table #{o.tableNo}</span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                {o.status}
              </span>
            </div>

            <ul className="text-sm text-white/80 space-y-1">
              {o.items.map((i, idx) => (
                <li key={idx}>
                  {i.qty} × {i.name}
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-4">
              {o.status === "new" && (
                <button
                  onClick={() => updateStatus(o.id, "preparing")}
                  className="flex-1 bg-yellow-400 text-black py-2 rounded-xl text-sm font-semibold"
                >
                  Start Preparing
                </button>
              )}
              {o.status === "preparing" && (
                <button
                  onClick={() => updateStatus(o.id, "ready")}
                  className="flex-1 bg-green-400 text-black py-2 rounded-xl text-sm font-semibold"
                >
                  Mark Ready
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
