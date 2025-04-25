import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { useEffect } from 'react';
import { setAuthToken } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    // Simuliuojamas prisijungimas (turėtum gauti token'ą iš BE)
    const fakeToken = 'FAKE_TOKEN';
    setAuthToken(fakeToken);
  }, []);

  return (
    <div className="container">
      <h1 className="my-3">Mano Prekių Sistema</h1>
      <ItemForm refreshItems={() => window.location.reload()} />
      <ItemList />
    </div>
  );
}

export default App;