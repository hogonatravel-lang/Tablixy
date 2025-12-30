import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Orders = ({ hotelId, profile }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hotelId) return;

    const q = query(
      collection(db, "hotels", hotelId, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(list);
      setLoading(false);
    });

    return () => unsub();
  }, [hotelId]);

  if (loading) {
    return <p className="text-white">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-white">No orders yet</p>;
  }

  return (
    <>
      <style>{`
        .order-card {
          background: #05100a;
          padding: 16px;
          border-radius: 14px;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .order-items {
          font-size: 14px;
          opacity: 0.9;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .paid {
          background: #00ff66;
          color: #000;
        }

        .pending {
          background: #ff9800;
          color: #000;
        }
      `}</style>

      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span>Table {order.tableNumber}</span>
            <span className={`badge ${order.paymentStatus === "paid" ? "paid" : "pending"}`}>
              {order.paymentStatus || "pending"}
            </span>
          </div>

          <div className="order-items">
            {order.items?.map((item, i) => (
              <div key={i}>
                {item.name} × {item.qty} — ₹{item.price * item.qty}
              </div>
            ))}
          </div>

          <div className="mt-2 font-bold">
            Total: ₹{order.totalAmount}
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
