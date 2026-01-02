import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import Overview from "./pages/Overview";
import Items from "./pages/Items";
import Staff from "./pages/Staff";
import QRCodes from "./pages/QRCodes";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import ComingSoon from "./pages/ComingSoon";

const DashboardHome = () => {
  const { user, profile } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!user || !profile) return;

    const fetchHotel = async () => {
      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (!userSnap.exists()) return;
      const { hotelId } = userSnap.data();
      if (!hotelId) return;
      const hotelSnap = await getDoc(doc(db, "hotels", hotelId));
      if (hotelSnap.exists()) setHotel(hotelSnap.data());
    };

    fetchHotel();
  }, [user, profile]);

  if (!hotel) return <p className="text-white text-center mt-10">Hotel not found...</p>;

  return (
    <div className="dashboard flex min-h-screen bg-[#0b1a10] text-white">
      <Sidebar profile={profile} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4">
        <Topbar profile={profile} hotel={hotel} />
        {activeTab === "overview" && <Overview hotel={hotel} profile={profile} />}
        {activeTab === "items" && profile.role === "manager" && <Items hotelId={hotel.hotelId} />}
        {activeTab === "staff" && profile.role === "manager" && <Staff hotelId={hotel.hotelId} />}
        {activeTab === "qr" && profile.role === "manager" && <QRCodes hotel={hotel} />}
        {activeTab === "orders" && <Orders hotelId={hotel.hotelId} profile={profile} />}
        {activeTab === "settings" && profile.role === "manager" && <Settings hotelId={hotel.hotelId} />}
        {profile.role === "guest" && <ComingSoon />}
      </div>
    </div>
  );
};

export default DashboardHome;
