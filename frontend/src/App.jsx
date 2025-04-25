import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
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
        setUser(userData);
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
                <Route path="/" element={user ? (
                    <div className="container mt-5">
                        <h1 className="text-center mb-4">Prekių valdymas</h1>
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
