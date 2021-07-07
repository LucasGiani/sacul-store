import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { NavBar } from "./components/NavBar"
import { ItemListContainer } from "./containers/ItemListContainer"
import { ItemDetailContainer } from './containers/ItemDetailContainer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GREETING } from './utils/const';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const onAddProduct = (producto) => {
    const newCart = cart.some(element => element.id === producto.id) ? 
      cart.map(element => {
        if(element.id === producto.id){
          element.cantidadComprada = producto.cantidadComprada + element.cantidadComprada;
          return element;
        }
        return element;
      }) : [...cart, producto];

      setCart(newCart);
  }

  return (
    <BrowserRouter>
      <header>
        <NavBar cart={cart}/>
      </header>
      <Switch>
        <Route exact path="/" render={() => (<ItemListContainer onAdd={onAddProduct} greeting={GREETING} products={products} setProducts={setProducts}/>)}/>
        <Route exact path="/category/:id" render={() => (<ItemListContainer onAdd={onAddProduct} products={products} setProducts={setProducts}/>)}/>
        <Route path="/item/:id" render={() => (<ItemDetailContainer onAdd={(p) => onAddProduct(p)} products={products}/>)} />
        <Route path="/cart" render={() => (<h1>Cart</h1>)} />
        <Route path="*" render={() => (<h1>404</h1>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
