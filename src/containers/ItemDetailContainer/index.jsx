import { useState } from "react";
import { useEffect } from "react"
import { ItemDetail } from "../../components/ItemDetail";
import { getData } from "../../utils/get-data";

export const ItemDetailContainer = ({onAdd}) => {

    const [product , setProduct] = useState();
    
    useEffect(() => {

        const waitForData = async () => {
            let data = await getData('zapatillas');
            let producto = data.map(element => {
                return {
                    id: element.id,
                    title: element.title,
                    img: element.thumbnail,
                    price: element.price,
                    stock: element.available_quantity,
                    cantidadComprada: 0
                }
            })[0];
            setProduct(producto);
        }

        setTimeout(() => {waitForData()}, 2000);
    }, []);

    const changeProduct = (product, count) => {
        let productoComprado = product;
        productoComprado.cantidadComprada = (product.cantidadComprada || 0) + count;

        onAdd(productoComprado);
    }

    return(
        <ItemDetail product={product} onAdd={changeProduct}/>
    )
}