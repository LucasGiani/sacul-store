import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../../components/ItemDetail";
import { Loader } from "../../components/Loader";
import { getDataByProductId } from "../../utils/get-data";

export const ItemDetailContainer = ({onAdd, products}) => {

    const [product , setProduct] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    
    useEffect(() => {
        if(!id) return window.alert('Id de producto no proporcionado');
      
        const waitForData = async () => {
            if(!product) {
                let data = await getDataByProductId(id);
                if(!data) return window.alert('El id del producto no es válido');
                let producto = {
                        id: data.id,
                        title: data.title,
                        img: data.thumbnail.replace('I.jpg', 'O.jpg'),
                        price: data.price,
                        stock: data.available_quantity,
                        cantidadComprada: 0
                    };
                setProduct(producto);
                setLoading(false);
            }
        }

        let producto = products.find(producto => producto.id === id);
        if(!producto){
            setLoading(true);
            setTimeout(() => {waitForData()}, 2000); 
        }
        else
            setProduct(producto);
    }, [id]);

    const changeProduct = (product, count) => {
        let productoComprado = product;
        productoComprado.cantidadComprada = (product.cantidadComprada || 0) + count;
        onAdd(productoComprado);
    }

    return(
        <>
            <Loader isShown={isLoading}>Cargando detalle del producto...</Loader>

            {product && 
                <ItemDetail product={product} onAdd={changeProduct}/>
            }
        </>
    )
}