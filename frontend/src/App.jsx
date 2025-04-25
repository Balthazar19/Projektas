import React, { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm.jsx";
import ItemList from "./components/ItemList.jsx";
import axios from "axios";

const API_URL = "https://localhost:3001/api/items"; // Taisyklingas adresas
const TOKEN = "fake-jwt-token";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          CustomValue: "SomeCustomHeader",
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Klaida gaunant prekes:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (newItem) => {
    try {
      await axios.post(API_URL, newItem, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          CustomValue: "SomeCustomHeader",
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Klaida kuriant prekę:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          CustomValue: "SomeCustomHeader",
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Klaida trinant prekę:", error);
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      await axios.patch(`${API_URL}/${id}`, updatedItem, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          CustomValue: "SomeCustomHeader",
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Klaida atnaujinant prekę:", error);
    }
  };

  return (
    <div className="container">
      <h1>Prekių valdymas</h1>
      <ItemForm onCreate={handleCreate} />
      <ItemList items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;
