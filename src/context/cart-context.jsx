import { useEffect, useState } from "react";
import { createContext } from "react";
import { CATEGORIAS, GREETING, HTTP_CODE_SUCCESS } from "../utils/const";
import { getDataFirebaseByCategory, getDataFirebaseByProductId } from "../utils/get-data";
import { Loader } from "../components/Loader";
import { addOrder } from "../utils/post-data";

export const CartContext = createContext();

export const CartContextComponent = ({ children }) => {

    const [isLoading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    //estado pensado en el paginado futuro
    const [cantidadPaginada, setCantidadPaginada] = useState(50);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            let productos = await waitForData();
            setProducts(productos);
            setLoading(false);
        }

        getData();
    }, []);

    const onAddProduct = (producto, count) => {
        const newCart = isInCart(producto) ? 
          cart.map(element => {
            if(element.producto.id === producto.id){
              element.cantidadComprada = count + element.cantidadComprada;
                element.subTotal = element.cantidadComprada * element.producto.price;
                return element;
            }
            return element;
          }) : [...cart, { producto: producto, cantidadComprada: count, subTotal: count * producto.price }];
    
        setCart(newCart);
    }

    const isInCart = (producto) => cart.some(element => element.producto.id === producto.id);

    const removeProduct = (producto) => setCart([...cart.filter(element => element.producto.id !== producto.id)]);

    const onChangeProduct = (producto) => setProducts([...products.map(element => element.id === producto.id ? producto : element)]);

    const getTotal = () => cart.map(element => element.subTotal).reduce((subtotalA, subtotalB) => subtotalA + subtotalB, 0).toFixed(2);

    const getCantidadComprada = () => cart.map(element => element.cantidadComprada).reduce((cantidadCompradaA, cantidadCompradaB) => cantidadCompradaA + cantidadCompradaB, 0);

    const updateCantidadComprada = (producto, amount) => {
        setCart([...cart.map(element => {
            if(element.producto.id === producto.id){
                element.cantidadComprada = amount;
                element.subTotal = amount * element.producto.price;
                return element;
              }
              return element;
        })]);
    }

    const restoreProductsStock = () => {

        const productsRestored = cart.map(cartElement => {
            let product = products.find(p => p.id === cartElement.producto.id);
            product.stock = product.stock + cartElement.cantidadComprada;
            return product;
        })

        const productsUpdated = products.map(element => {
            let producto = productsRestored.find(p => p.id === element.id);
            return !!producto ? producto : element;
        });

        setProducts(productsUpdated);
    }

    const addProductsWithoutRepeat = (productos) => {
        let newProducts = productos.filter(element => !products.some(producto => producto.id === element.id));
        setProducts(products.concat(newProducts));
    }

    const waitForData = async (id) => {
        let productos = products.filter(producto => producto.category === id);

        if (!productos.length || (!!productos.length && productos.length <= cantidadPaginada)) 
            productos = await getDataFirebaseByCategory(id || CATEGORIAS.BATERIA_ACUSTICA);

        if (id)
            addProductsWithoutRepeat(productos);
        
        return productos;
    }

    const waitForProduct = async (id) => {
        let producto = products.find(producto => producto.id === id);
        if (!producto) {
            let data = await getDataFirebaseByProductId(id);
            if (!data) {
                return window.alert('El id del producto no es válido');
            }
            producto = data;
            setProducts([...products, producto]);
        }

        return producto;
    }

    const createOrder = async (name, email, phone) => {
        const order = { buyer: { name, email, phone }, item: cart, total: getTotal(), fecha_compra: new Date() };

        try {
            await addOrder(order);
        }
        catch {
            throw new Error('Error al crear la orden de compra');
        }

        return HTTP_CODE_SUCCESS;
    }

    const deleteAll = () => {
        restoreProductsStock();
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart, setCart, products, setProducts,
                onAddProduct, onChangeProduct,
                greeting: GREETING, waitForData, waitForProduct,
                removeProduct, getTotal, getCantidadComprada, updateCantidadComprada,
                createOrder, deleteAll, cantidadPaginada
            }}>
            
            <Loader isShown={isLoading}>Cargando...</Loader>
            
            {!isLoading && products.length > 0 && children}

        </CartContext.Provider>
    )

}