import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../../components/ItemDetail";
import { CartContext } from "../../context/cart-context";

export const ItemDetailContainer = () => {
    const { onAddProduct, products, waitForProduct } = useContext(CartContext);
    const [product , setProduct] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        if(!id) return window.alert('Id de producto no proporcionado');
        let producto = products.find(producto => producto.id === id);

        if (!producto)
            producto = waitForProduct(id);
        
        setProduct(producto);
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