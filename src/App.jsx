import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { NavBar } from "./components/NavBar"
import { ItemListContainer } from "./containers/ItemListContainer"
import { ItemDetailContainer } from './containers/ItemDetailContainer';

function App() {
  const [cart, setCart] = useState([]);

  const onAddProduct = (producto) => {
    const newCart = cart.filter(element => element.id !== producto.id);
    setCart([...newCart, producto]);
  }

  return (
    <section>
      <NavBar cart={cart}/>
      <ItemDetailContainer onAdd={onAddProduct}/>
      <ItemListContainer onAdd={onAddProduct} greeting={'Hola, te damos la bienvenida a nuestro e-commerce!'}/>
    </section>
  );
}

export default App;
