import { QRCodeCanvas } from "qrcode.react";

const QRCodes = ({ hotel }) => {
  if (!hotel || !hotel.tables) return <p className="text-white">Loading QR Codes...</p>;

  const tableNumbers = Array.from({ length: hotel.tables }, (_, i) => i + 1);

  const downloadQR = (num) => {
    const canvas = document.getElementById(`qr-${num}`);
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${hotel.hotelId}-T${num}.png`;
    a.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">QR Codes for {hotel.hotelName}</h2>
      <div className="qr-grid">
        {tableNumbers.map((num) => (
          <div key={num} className="qr-card">
            <QRCodeCanvas id={`qr-${num}`} value={`${hotel.hotelId}-T${num}`} size={150} />
            <p className="mt-2 text-white">Table {num}</p>
            <button onClick={() => downloadQR(num)} className="btn mt-1">
              Download
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .qr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }
        .qr-card {
          background: #05100a;
          padding: 12px;
          border-radius: 12px;
          text-align: center;
        }
        .btn {
          padding: 6px 12px;
          border-radius: 8px;
          background: #00ff66;
          color: #000;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default QRCodes;
