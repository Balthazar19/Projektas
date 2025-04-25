import { useState } from 'react';
import api from '../services/api';

function ItemForm({ refreshItems }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/items', { name, description });
    refreshItems();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <input className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button className="btn btn-primary" type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;
