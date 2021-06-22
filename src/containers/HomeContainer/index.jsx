
import { useState } from "react"
import { NavBar } from "../../components/NavBar"
import { ItemListContainer } from "../ItemListContainer"

export const HomeContainer = () => {
    const [cart, setCart] = useState([]);

    return(
        <section>
            <NavBar cart={cart}/>
            <ItemListContainer onAdd={(producto) => setCart([...cart, producto])} greeting={'Hola, te damos la bienvenida a nuestro e-commerce!'}/>
        </section>
    )
}