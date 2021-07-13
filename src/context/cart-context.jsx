import { useEffect, useState } from "react";
import { createContext } from "react";
import { GREETING, SUBCATEGORY } from "../utils/const";
import { getDataByProductId, getDataByText } from "../utils/get-data";
import { Loader } from "../components/Loader";

export const CartContext = createContext();

export const CartContextComponent = ({ children }) => {

    const [isLoading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setProducts(waitForData());
        }, 2000);
    }, []);

    const onAddProduct = (producto) => {
        const newCart = isInCart(producto) ? 
          cart.map(element => {
            if(element.id === producto.id){
              element.cantidadComprada = producto.cantidadComprada + element.cantidadComprada;
              return element;
            }
            return element;
          }) : [...cart, producto];
    
        setCart(newCart);
    }

    const isInCart = (producto) => cart.some(element => element.id === producto.id);

    const waitForData = async (id) => {
        setLoading(true);
        
        let data = await getDataByText(SUBCATEGORY[parseInt(id || "1")]?.title);
        let productos = data.map(element => {
                return {
                id: element.id,
                title: element.title,
                img: element.thumbnail.replace('I.jpg', 'O.jpg'),
                price: element.price,
                stock: element.available_quantity,
                cantidadComprada: 0,
                subcategory: parseInt(id || "1")
            }
        });
        setProducts(products.concat(productos));
        setLoading(false);
        return productos;
    }

    const waitForProduct = async (id) => {
        setLoading(true);
        let producto = products.find(producto => producto.id === id);
        if (!producto) {  
            let data = await getDataByProductId(id);
            if(!data) return window.alert('El id del producto no es válido');
            producto = {
                    id: data.id,
                    title: data.title,
                    img: data.thumbnail.replace('I.jpg', 'O.jpg'),
                    price: data.price,
                    stock: data.available_quantity,
                    cantidadComprada: 0
            };
        }
        setLoading(false);
        return producto;
    }


    return (
        <CartContext.Provider
            value={{ cart, setCart, products, setProducts, onAddProduct, greeting: GREETING, waitForData, waitForProduct }}>
            
            <Loader isShown={isLoading}>Cargando...</Loader>
            
            {!isLoading && products.length > 0 && children}

        </CartContext.Provider>
    )

}