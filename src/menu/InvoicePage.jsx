import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const InvoicePage = () => {
  const { hotelId, orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const snap = await getDoc(
        doc(db, "hotels", hotelId, "orders", orderId)
      );
      setOrder(snap.data());
    };
    fetchOrder();
  }, []);

  const submitReview = async (value) => {
    await updateDoc(
      doc(db, "hotels", hotelId, "orders", orderId),
      { review: value }
    );
    setShowReview(false);
  };

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#0b1a10] text-white p-6">
      <div className="bg-[#05100a] rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Invoice</h2>

        <p className="text-sm mb-2">Table: {order.tableNo}</p>

        {order.items.map((i, idx) => (
          <div key={idx} className="flex justify-between mb-1">
            <span>{i.name} × {i.qty}</span>
            <span>₹{i.price * i.qty}</span>
          </div>
        ))}

        <hr className="my-4 opacity-30" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="w-full mt-6 bg-green-400 text-black py-3 rounded-xl"
      >
        Download Invoice
      </button>

      <button
        onClick={() => setShowReview(true)}
        className="w-full mt-3 border border-green-400 py-3 rounded-xl"
      >
        Skip & Review
      </button>

      {showReview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#05100a] p-6 rounded-xl text-center">
            <h3 className="mb-4 font-bold">How was your experience?</h3>

            <div className="flex gap-4 text-3xl justify-center">
              <button onClick={() => submitReview("TOO_BAD")}>😡</button>
              <button onClick={() => submitReview("NOT_BAD")}>😐</button>
              <button onClick={() => submitReview("HAPPY")}>🙂</button>
              <button onClick={() => submitReview("TOO_GOOD")}>😍</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
