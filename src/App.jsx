import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { NavBar } from "./components/NavBar"
import { ItemListContainer } from "./containers/ItemListContainer"


function App() {
  const [cart, setCart] = useState([]);

  return (
    <section>
      <NavBar cart={cart}/>
      <ItemListContainer onAdd={(producto) => setCart([...cart, producto])} greeting={'Hola, te damos la bienvenida a nuestro e-commerce!'}/>
    </section>
  );
}

export default App;
