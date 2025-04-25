import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="container">
      <h1 className="my-4">Mano Prekių Sistema</h1>
      <ItemForm />
      <ItemList />
    </div>
  );
}

export default App;
