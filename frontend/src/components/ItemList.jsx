import React, { useState } from "react";

function ItemList({ items, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditDescription(item.description);
  };

  const handleSave = () => {
    onUpdate(editId, { name: editName, description: editDescription });
    setEditId(null);
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px", background: "#fff", padding: "10px", borderRadius: "8px" }}>
          {editId === item.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button onClick={handleSave}>Išsaugoti</button>
              <button onClick={() => setEditId(null)}>Atšaukti</button>
            </>
          ) : (
            <>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button onClick={() => startEdit(item)}>Redaguoti</button>
              <button onClick={() => onDelete(item.id)}>Ištrinti</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemList;
