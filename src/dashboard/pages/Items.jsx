import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

const Items = ({ hotelId }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "veg",
    course: "main course",
    image: DEFAULT_IMG,
  });

  /* ---------------- FETCH ITEMS ---------------- */
  const fetchItems = async () => {
    const snap = await getDocs(collection(db, "hotels", hotelId, "items"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setItems(data);
    setFilteredItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, [hotelId]);

  /* ---------------- SEARCH & FILTER ---------------- */
  useEffect(() => {
    let data = [...items];

    if (search) {
      data = data.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      data = data.filter((i) => i.category === categoryFilter);
    }

    if (courseFilter !== "all") {
      data = data.filter((i) => i.course === courseFilter);
    }

    setFilteredItems(data);
  }, [search, categoryFilter, courseFilter, items]);

  /* ---------------- ADD / UPDATE ITEM ---------------- */
  const saveItem = async () => {
    if (!form.name || !form.price) return;

    if (editingItem) {
      await updateDoc(
        doc(db, "hotels", hotelId, "items", editingItem.id),
        {
          ...form,
          price: Number(form.price),
        }
      );
    } else {
      await addDoc(collection(db, "hotels", hotelId, "items"), {
        ...form,
        price: Number(form.price),
      });
    }

    closeModal();
    fetchItems();
  };

  /* ---------------- DELETE ITEM ---------------- */
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "hotels", hotelId, "items", id));
    fetchItems();
  };

  /* ---------------- MODAL HELPERS ---------------- */
  const openAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      price: "",
      category: "veg",
      course: "main course",
      image: DEFAULT_IMG,
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="wrapper">
      {/* Header */}
      <div className="header">
        <h2>Item Management</h2>
        <button className="btn-primary" onClick={openAdd}>
          + Add Item
        </button>
      </div>

      {/* Search & Filters */}
      <div className="filters">
        <input
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Category</option>
          <option value="veg">Veg</option>
          <option value="non veg">Non Veg</option>
        </select>

        <select onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="all">All Course</option>
          <option>main course</option>
          <option>starters</option>
          <option>baverage</option>
          <option>dessert</option>
          <option>ice cream</option>
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image || DEFAULT_IMG} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="badges">
              <span>{item.category}</span>
              <span>{item.course}</span>
            </div>

            <div className="actions">
              <button onClick={() => openEdit(item)}>Edit</button>
              <button className="danger" onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            <h3>{editingItem ? "Edit Item" : "Add Item"}</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>veg</option>
              <option>non veg</option>
            </select>

            <select
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            >
              <option>main course</option>
              <option>starters</option>
              <option>baverage</option>
              <option>dessert</option>
              <option>ice cream</option>
            </select>

            <div className="modal-actions">
              <button className="btn-primary" onClick={saveItem}>
                {editingItem ? "Update" : "Add"}
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
  .wrapper { padding:1rem; color:#fff }

  .header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:1rem;
  }

  /* 🔍 Filters */
  .filters {
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    margin-bottom:1rem;
  }

  .filters input,
  .filters select,
  .modal input,
  .modal select {
    background:#0b1a10;
    color:#e5e7eb;
    border:1px solid #1f2937;
    padding:10px;
    border-radius:10px;
    outline:none;
    width:100%;
    max-width:220px;
  }

  /* Placeholder */
  .filters input::placeholder,
  .modal input::placeholder {
    color:#dfe1e6;
  }

  /* Focus effect */
  .filters input:focus,
  .filters select:focus,
  .modal input:focus,
  .modal select:focus {
    border-color:#00ff66;
    box-shadow:0 0 0 2px rgba(11, 152, 67, 0.25);
  }

  /* Grid */
  .grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
    gap:1rem;
  }

  .card {
    background:#05100a;
    padding:1rem;
    border-radius:16px;
    box-shadow:0 6px 20px rgba(0,0,0,0.3);
    transition:transform .2s ease;
  }

  .card:hover {
    transform:translateY(-4px);
  }

  .card img {
    width:100%;
    height:130px;
    object-fit:cover;
    border-radius:12px;
    margin-bottom:8px;
  }

  .card h3 {
    font-weight:600;
    margin-bottom:4px;
  }

  .badges {
    display:flex;
    gap:6px;
    font-size:12px;
    margin-top:6px;
  }

  .badges span {
    background:#0b1a10;
    padding:3px 8px;
    border-radius:999px;
    border:1px solid #1f2937;
  }

  .actions {
    display:flex;
    gap:8px;
    margin-top:10px;
  }

  button {
    padding:8px 12px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    font-weight:600;
  }

  .btn-primary {
    background:#00ff66;
    color:#000;
  }

  .danger {
    background:#ef4444;
    color:#fff;
  }

  /* 🪟 Modal */
  .modal-bg {
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.75);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
  }

  .modal {
    background:#05100a;
    padding:1.5rem;
    border-radius:18px;
    width:100%;
    max-width:380px;
    display:flex;
    flex-direction:column;
    gap:12px;
    box-shadow:0 20px 60px rgba(0,0,0,.6);
  }

  .modal h3 {
    font-size:1.25rem;
    font-weight:600;
  }

  .modal-actions {
    display:flex;
    gap:10px;
    margin-top:10px;
  }
`}</style>

    </div>
  );
};

export default Items;
