import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Cart } from "./components/CartComponent";
import { ItemListContainer } from "./containers/ItemListContainer"
import { ItemDetailContainer } from './containers/ItemDetailContainer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartContextComponent } from './context/cart-context';

function App() {
  return (
    <CartContextComponent>
      <BrowserRouter>
        <header>
          <NavBar/>
        </header>
        <Switch>
          <Route exact path="/" render={() => <ItemListContainer />}/>
          <Route exact path="/category/:id" render={() => (<ItemListContainer />)}/>
          <Route path="/item/:id" render={() => (<ItemDetailContainer />)} />
          <Route path="/cart" render={() => (<Cart />)} />
          <Route path="*" render={() => (<h1>404</h1>)} />
        </Switch>
      </BrowserRouter>
    </CartContextComponent>
  );
}

export default App;
