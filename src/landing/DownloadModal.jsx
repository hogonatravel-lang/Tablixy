const DownloadModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#0c1d12] border border-white/10 rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-extrabold mb-6">Download Tablixy</h2>

        <div className="space-y-4">
          <a
            href="/downloads/tablixy-android.apk"
            className="block bg-[#00ff66] text-black py-3 rounded-lg font-bold"
          >
            Download for Android
          </a>

          <a
            href="/downloads/tablixy-windows.exe"
            className="block bg-white/10 text-white py-3 rounded-lg font-bold"
          >
            Download for Windows
          </a>

          <button
            disabled
            className="w-full bg-white/5 text-gray-400 py-3 rounded-lg font-bold cursor-not-allowed"
          >
            iOS (Coming Soon)
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
