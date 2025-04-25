import { useEffect, useState } from 'react';
import api from '../services/api';

function ItemList() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await api.get('/items');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="card mb-2 p-2">
          <h5>{item.name}</h5>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
