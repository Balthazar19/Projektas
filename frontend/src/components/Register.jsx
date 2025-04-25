import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                alert("Registracija sėkminga!");
                navigate("/login");
            } else {
                const data = await res.json();
                alert(data.error || "Registracija nepavyko");
            }
        } catch (err) {
            console.error("Registracijos klaida:", err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Registracija</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">El. paštas</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Slaptažodis</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registruotis</button>
                </form>
                <div className="text-center mt-3">
                    <p>Jau turi paskyrą? <Link to="/login" className="text-decoration-none">Prisijunk</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
