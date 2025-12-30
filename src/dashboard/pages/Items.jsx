import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const DEFAULT_IMG = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

const Items = ({ hotelId }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "veg",
    course: "main course",
    image: DEFAULT_IMG,
  });

  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "hotels", hotelId, "items"));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchItems();
  }, [hotelId]);

  const addItem = async () => {
    if (!newItem.name || !newItem.price) return;
    await addDoc(collection(db, "hotels", hotelId, "items"), newItem);
    setShowModal(false);
    setNewItem({ name: "", price: "", category: "veg", course: "main course", image: DEFAULT_IMG });
    fetchItems();
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "hotels", hotelId, "items", id));
    fetchItems();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 flex justify-between items-center">
        Item Management
        <button className="btn" onClick={() => setShowModal(true)}>Add Item</button>
      </h2>

      {/* Items List */}
      <div className="items-list">
        {items.map(i => (
          <div key={i.id} className="item-card">
            <img src={i.image || DEFAULT_IMG} width={50} />
            <div>{i.name} - ₹{i.price}</div>
            <div>{i.category} / {i.course}</div>
            <button onClick={() => deleteItem(i.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Add Item</h3>
            <input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
            <input placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
            <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
              <option>veg</option>
              <option>non veg</option>
            </select>
            <select value={newItem.course} onChange={e => setNewItem({ ...newItem, course: e.target.value })}>
              <option>main course</option>
              <option>starters</option>
              <option>baverage</option>
              <option>desert</option>
              <option>ice cream</option>
            </select>
            <button onClick={addItem}>Add</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Inline CSS */}
      <style>{`
        .items-list { display:flex; flex-wrap:wrap; gap:1rem; margin-top:1rem; }
        .item-card { background:#05100a; padding:0.5rem 1rem; border-radius:8px; display:flex; flex-direction:column; align-items:center; gap:6px; }
        .btn { padding:6px 12px; border-radius:6px; background:#00ff66; color:#000; font-weight:700; cursor:pointer; }
        .modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:9999; }
        .modal-card { background:#05100a; padding:2rem; border-radius:12px; width:100%; max-width:360px; display:flex; flex-direction:column; gap:10px; }
        .modal-card input, .modal-card select, .modal-card button { width:100%; padding:8px; border-radius:6px; border:none; }
      `}</style>
    </div>
  );
};

export default Items;
