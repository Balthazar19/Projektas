import { useState } from 'react';
import api from '../services/api';

function ItemForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/items', { name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input className="form-control mb-2" placeholder="Prekės pavadinimas" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="form-control mb-2" placeholder="Prekės aprašymas" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit" className="btn btn-primary">Pridėti prekę</button>
    </form>
  );
}

export default ItemForm;
