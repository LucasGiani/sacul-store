import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../../components/ItemDetail";
import { CartContext } from "../../context/cart-context";

export const ItemDetailContainer = () => {
    const { onAddProduct, waitForProduct } = useContext(CartContext);
    const [product , setProduct] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        let mounted = true;

        if(!id) return window.alert('Id de producto no proporcionado');

        const getData = async () => {
            let producto = await waitForProduct(id);
            if (mounted)
                setProduct(producto);
        }
       
        getData();

        return () => mounted = false;
    }, [id]);

    const changeProduct = (product, count) => {
        let productoComprado = product;
        productoComprado.cantidadComprada = (product.cantidadComprada || 0) + count;
        productoComprado.subTotal = count * product.price;
        onAddProduct(productoComprado);
    }

    return(
        <>
            {product && 
                <ItemDetail product={product} onAdd={changeProduct}/>
            }
        </>
    )
}