
import { NavBar } from "../../components/NavBar"
import { ItemListContainer } from "../ItemListContainer"

export const HomeContainer = () => {
    return(
        <section>
            <NavBar/>
            <ItemListContainer greeting={'Hola, te damos la bienvenida a nuestro e-commerce!'}/>
        </section>
    )
}