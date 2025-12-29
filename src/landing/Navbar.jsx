import { useState } from "react";
import SignInModal from "../auth/SignInModal";
import DownloadModal from "./DownloadModal";

const Navbar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05100a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo + Links */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00ff66] rounded flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#05100a]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 4h7v7H4zm0 9h7v7H4zm9-9h7v7h-7zm0 9h7v7h-7z" />
                  </svg>
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Tablixy
                </span>
              </div>

              <div className="hidden md:flex ml-12 space-x-8">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-[#00ff66] transition-colors font-medium"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-gray-300 hover:text-[#00ff66] transition-colors font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#00ff66] transition-colors font-medium"
                >
                  Pricing
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSignIn(true)}
                className="text-white hover:text-white/80 transition-colors font-medium px-4 py-2"
              >
                Login
              </button>

              <button
                onClick={() => setShowDownload(true)}
                className="bg-[#00ff66] text-[#05100a] px-6 py-2.5 rounded-md font-bold hover:bg-[#00e65c] transition-all transform hover:scale-105"
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} />
      )}

      {showDownload && (
        <DownloadModal onClose={() => setShowDownload(false)} />
      )}
    </>
  );
};

export default Navbar;
