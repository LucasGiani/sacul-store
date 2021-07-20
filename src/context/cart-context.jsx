import { useEffect, useState } from "react";
import { createContext } from "react";
import { CATEGORIAS, GREETING } from "../utils/const";
import { getDataFirebaseByCategory, getDataFirebaseByProductId } from "../utils/get-data";
import { Loader } from "../components/Loader";

export const CartContext = createContext();

export const CartContextComponent = ({ children }) => {

    const [isLoading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    //estado pensado en el paginado futuro
    const [cantidadPaginada, setCantidadPaginada] = useState(50);

    useEffect(() => {
        const getData = async () => {
            let productos = await waitForData();
            setProducts(productos);
        }

        getData();
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

    const removeProduct = (producto) => setCart([...cart.filter(element => element.id !== producto.id)]);

    const waitForData = async (id) => {
        setLoading(true);

        let productos = products.filter(producto => producto.category === id);

        if (!productos.length || (!!productos.length && productos.length <= cantidadPaginada))
            productos = await getDataFirebaseByCategory(id || CATEGORIAS.BATERIA_ACUSTICA);

        if (id)
            setProducts(products.concat(productos));
        
        setLoading(false);
        return productos;
    }

    const waitForProduct = async (id) => {
        setLoading(true);

        let producto = products.find(producto => producto.id === id);
        if (!producto) {  
            let data = await getDataFirebaseByProductId(id);
            if (!data) {
                setLoading(false);
                return window.alert('El id del producto no es válido');
            }
            producto = data;
            setProducts([...products, producto]);
        }

        setLoading(false);
        return producto;
    }

    const getTotal = () => cart.map(product => product.subTotal).reduce((subtotalA, subtotalB) => subtotalA + subtotalB, 0).toFixed(2);

    const updateCantidadComprada = (product, amount) => {
        product.cantidadComprada = amount;
        product.subTotal = product.price * amount;
        setCart([...cart.map(element => element.id === product.id ? product : element)]);
    }

    return (
        <CartContext.Provider
            value={{
                cart, setCart, products, setProducts, onAddProduct,
                greeting: GREETING, waitForData, waitForProduct,
                removeProduct, getTotal, updateCantidadComprada,
                cantidadPaginada
            }}>
            
            <Loader isShown={isLoading}>Cargando...</Loader>
            
            {!isLoading && products.length > 0 && children}

        </CartContext.Provider>
    )

}