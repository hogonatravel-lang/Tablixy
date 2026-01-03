import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const OrderPage = () => {
  const { state } = useLocation();
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const { tableNo, items } = state;

  const totalAmount = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const placeFinalOrder = async (paymentMethod) => {
    const docRef = await addDoc(
      collection(db, "hotels", hotelId, "orders"),
      {
        tableNo,
        items,
        totalAmount,
        paymentMethod,
        status: "PLACED",
        createdAt: serverTimestamp()
      }
    );

    navigate(`/invoice/${hotelId}/${docRef.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0b1a10] text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>

      {items.map(i => (
        <div key={i.id} className="flex justify-between mb-2">
          <span>{i.name} × {i.qty}</span>
          <span>₹{i.price * i.qty}</span>
        </div>
      ))}

      <hr className="my-4 opacity-30" />

      <h3 className="text-xl font-bold mb-6">
        Total ₹{totalAmount}
      </h3>

      <button
        className="w-full bg-green-400 text-black py-3 rounded-xl mb-3"
        onClick={() => placeFinalOrder("ONLINE")}
      >
        Pay Online
      </button>

      <button
        className="w-full border border-green-400 py-3 rounded-xl"
        onClick={() => placeFinalOrder("COUNTER")}
      >
        Pay at Counter
      </button>
    </div>
  );
};

export default OrderPage;
