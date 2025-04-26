import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile({ user, onUpdateProfile }) {
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({ email, password });
    setEditing(false);
    alert("Profilis atnaujintas!");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="card-title mb-4">Vartotojo profilis</h2>

        {!user ? (
          <p>Kraunama...</p>
        ) : editing ? (
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Naujas el. paštas</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Naujas slaptažodis</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success me-2">Išsaugoti</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Atšaukti</button>
          </form>
        ) : (
          <>
            <p><strong>El. paštas:</strong> {user.email}</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEmail(user.email);
                  setEditing(true);
                }}
              >
                Redaguoti profilį
              </button>
              <Link to="/" className="btn btn-outline-primary">
                Grįžti į prekes
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
