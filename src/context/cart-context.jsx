import { useEffect, useState } from "react";
import { createContext } from "react";
import { PRODUCT_CATEGORY, GREETING, ORDER_STATE } from "../utils/const";
import { getDataFirebaseByCategory, getDataFirebaseByProductId } from "../utils/get-data";
import { Loader } from "../components/Loader";
import { addOrder } from "../utils/post-data";

export const CartContext = createContext();

export const CartContextComponent = ({ children }) => {

    const [isLoading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const cantidadPaginada = 50;

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

        producto.stock -= count;

        const newCart = isInCart(producto) ?
            cart.map(element => {
                if (element.producto.id === producto.id) {
                    element.producto = producto;
                    element.cantidadComprada = count + element.cantidadComprada;
                    element.subTotal = element.cantidadComprada * element.producto.price;
                }
                return element;
            }) : [...cart, { producto: producto, cantidadComprada: count, subTotal: count * producto.price }];
        
        onChangeProduct(producto);
        setCart(newCart);
    }

    const isInCart = (producto) => cart.some(element => element.producto.id === producto.id);

    const removeProduct = (producto) => setCart([...cart.filter(element => element.producto.id !== producto.id)]);

    const onChangeProduct = (producto) => setProducts([...products.map(element => element.id === producto.id ? producto : element)]);

    const getTotal = () => cart.map(element => element.subTotal).reduce((subtotalA, subtotalB) => subtotalA + subtotalB, 0).toFixed(2);

    const getCantidadComprada = () => cart.map(element => element.cantidadComprada).reduce((cantidadCompradaA, cantidadCompradaB) => cantidadCompradaA + cantidadCompradaB, 0);

    const updateCantidadComprada = (producto, amount) => {
        setCart([...cart.map(element => {
            if (element.producto.id === producto.id) {
                producto.stock = element.cantidadComprada < amount ?
                    producto.stock -= 1 : producto.stock += 1;
                
                element.producto = producto;
                element.cantidadComprada = amount;
                element.subTotal = amount * element.producto.price;
                return element;
              }
              return element;
        })]);
        
        onChangeProduct(producto);
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

    const deleteAll = () => {
        restoreProductsStock();
        cleanCart();
    };

    const cleanCart = () => setCart([]);

    const waitForData = async (id) => {
        let productos = products.filter(producto => producto.category === id);

        if (!productos.length || (!!productos.length && productos.length <= cantidadPaginada)) 
            productos = await getDataFirebaseByCategory(id || PRODUCT_CATEGORY.BATERIA_ACUSTICA);

        if (id)
            addProductsWithoutRepeat(productos);
        
        return productos;
    }

    const waitForProduct = async (id) => {
        let producto = products.find(producto => producto.id === id);
        if (!producto) {
            try {
                let data = await getDataFirebaseByProductId(id);
                if (!data) throw new Error();
                producto = data;
                setProducts([...products, producto]);
            }
            catch (e) {
                throw new Error(e);
            }
        }

        return producto;
    }

    const createOrder = async (name, email, phone) => {
        const order = {
            buyer: { name, email, phone },
            item: cart,
            total: getTotal(),
            fecha_compra: new Date(),
            estado: ORDER_STATE.GENERADA
        };

        try {
            return await addOrder(order);
        }
        catch {
            throw new Error('Error al crear la orden de compra');
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart, products, onAddProduct, greeting: GREETING, waitForData, waitForProduct,
                removeProduct, getTotal, getCantidadComprada, updateCantidadComprada,
                createOrder, deleteAll, cleanCart, cantidadPaginada
            }}>
            
            <Loader isShown={isLoading}>Cargando...</Loader>
            
            {!isLoading && products.length > 0 && children}

        </CartContext.Provider>
    )
}