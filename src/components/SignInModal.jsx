import { useState } from "react";

const SignInModal = ({ onClose }) => {
  const [role, setRole] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#0c1d12] border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-extrabold mb-6 text-center">
          Sign In to Tablixy
        </h2>

        {!role ? (
          <div className="space-y-4">
            <button
              onClick={() => setRole("manager")}
              className="w-full bg-[#00ff66] text-black py-3 rounded-lg font-bold"
            >
              Sign in as Manager
            </button>

            <button
              onClick={() => setRole("staff")}
              className="w-full bg-white/10 text-white py-3 rounded-lg font-bold"
            >
              Sign in as Staff
            </button>
          </div>
        ) : (
          <form className="space-y-4">
            <p className="text-sm text-gray-400">
              Signing in as <b>{role}</b>
            </p>

            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#00ff66] text-black py-3 rounded-lg font-bold"
            >
              Continue with Email
            </button>
          </form>
        )}

        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
