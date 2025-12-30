import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // or "/login" if you have login route
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .logout-btn {
          background: #ff3b3b;
          color: white;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          margin-top: 20px;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: #d62828;
        }
      `}</style>

      <div>
        <h2 className="text-2xl mb-4">Settings</h2>
        <p className="opacity-80">Profile and basic settings will be here.</p>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </>
  );
};

export default Settings;
