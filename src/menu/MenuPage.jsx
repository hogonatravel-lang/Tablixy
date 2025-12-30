import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const MenuPage = () => {
  const { hotelId } = useParams();
  const [params] = useSearchParams();
  const tableNo = params.get("table");

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const snap = await getDocs(
        collection(db, "hotels", hotelId, "items")
      );

      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchMenu();
  }, [hotelId]);

  return (
    <div className="min-h-screen bg-[#0b1a10] text-white p-4">
      <h1 className="text-2xl font-bold">Menu</h1>
      <p className="text-sm text-gray-400">Table {tableNo}</p>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {items.map(item => (
          <div key={item.id} className="bg-[#05100a] p-4 rounded-xl">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>

            <button className="mt-2 bg-green-400 text-black px-4 py-1 rounded">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
