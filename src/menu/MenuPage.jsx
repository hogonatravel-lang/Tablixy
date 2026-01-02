import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const MenuPage = () => {
  const { hotelId } = useParams();
  const [params] = useSearchParams();
  const tableNo = params.get("table");

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      const snap = await getDocs(
        collection(db, "hotels", hotelId, "items")
      );
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchMenu();
  }, [hotelId]);

  const addItem = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeItem = (item) => {
    setCart(prev => {
      const count = (prev[item.id] || 0) - 1;
      if (count <= 0) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }
      return { ...prev, [item.id]: count };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <>
      <style>{`
        .menu-container {
          min-height: 100vh;
          background: #0b1a10;
          color: white;
          padding-bottom: 120px;
        }

        .menu-header {
          padding: 16px;
          position: sticky;
          top: 0;
          background: #0b1a10;
          z-index: 10;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          padding: 16px;
        }

        .menu-card {
          background: #05100a;
          border-radius: 16px;
          padding: 14px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .menu-img {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          object-fit: cover;
          background: #222;
        }

        .qty-btn {
          border: none;
          background: #00ff66;
          color: #000;
          border-radius: 6px;
          padding: 4px 10px;
          font-weight: bold;
          cursor: pointer;
        }

        .order-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #05100a;
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.15);
        }

        .order-btn {
          width: 100%;
          background: #00ff66;
          color: #000;
          font-size: 18px;
          font-weight: bold;
          padding: 14px;
          border-radius: 14px;
          border: none;
        }

        .fab {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 56px;
          height: 56px;
          background: #00ff66;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
      `}</style>

      <div className="menu-container">
        {/* HEADER */}
        <div className="menu-header">
          <h1 className="text-xl font-bold">Menu</h1>
          <p className="text-sm text-gray-400">Table {tableNo}</p>
        </div>

        {/* MENU LIST */}
        <div className="menu-grid">
          {items.map(item => {
            const qty = cart[item.id] || 0;
            return (
              <div key={item.id} className="menu-card">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.category}</p>
                  <p className="mt-1">₹{item.price}</p>

                  <div className="mt-2 flex items-center gap-8">
                    {qty > 0 ? (
                      <>
                        <button className="qty-btn" onClick={() => removeItem(item)}>-</button>
                        <span>{qty}</span>
                        <button className="qty-btn" onClick={() => addItem(item)}>+</button>
                      </>
                    ) : (
                      <button className="qty-btn" onClick={() => addItem(item)}>
                        Add
                      </button>
                    )}
                  </div>
                </div>

                <img
                  src={item.image || "/default-food.jpg"}
                  className="menu-img"
                  alt={item.name}
                />
              </div>
            );
          })}
        </div>

        {/* CALL WAITER FAB */}
        <div
          className="fab"
          onClick={() => alert(`Waiter called for Table ${tableNo}`)}
          title="Call Waiter"
        >
          ☎
        </div>

        {/* ORDER BAR */}
        {totalItems > 0 && (
          <div className="order-bar">
            <button className="order-btn">
              Order ({totalItems} items)
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPage;
