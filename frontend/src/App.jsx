import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import axios from "axios";

const API_URL = "https://localhost:3001/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Klaida gaunant prekes:", error);
    }
  };

  const handleLogin = (userData) => {
    setUser({ token: userData.token, email: userData.email });
  };
  console.log(user);

  const handleLogout = () => {
    setUser(null);
  };

  const handleCreate = async (newItem) => {
    try {
      await axios.post(API_URL, newItem, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
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
          Authorization: `Bearer ${user?.token}`,
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
          Authorization: `Bearer ${user?.token}`,
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Klaida atnaujinant prekę:", error);
    }
  };

  const updateProfile = async ({ email, password }) => {
    try {
      await axios.patch(
        "https://localhost:3001/api/auth/update",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setUser((prev) => ({ ...prev, email }));
    } catch (error) {
      console.error("Klaida atnaujinant profilį:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={user ? <Profile user={user} onUpdateProfile={updateProfile} /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? (
          <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Prekių valdymas</h1>
              <div>
                <Link to="/profile" className="btn btn-outline-secondary me-2">Profilis</Link>
                <button className="btn btn-danger" onClick={handleLogout}>Atsijungti</button>
              </div>
            </div>
            <ItemForm onCreate={handleCreate} />
            <ItemList items={items} onDelete={handleDelete} onUpdate={handleUpdate} />
          </div>
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>
    </Router>
  );
}

export default App;