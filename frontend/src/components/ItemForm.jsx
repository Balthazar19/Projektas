import React, { useState } from "react";

function ItemForm({ onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Prašome užpildyti visus laukus.");
      return;
    }
    onCreate({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pavadinimas"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Aprašymas"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Sukurti prekę</button>
    </form>
  );
}

export default ItemForm;
