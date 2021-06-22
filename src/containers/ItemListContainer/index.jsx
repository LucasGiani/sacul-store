import { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { ItemList } from "../../components/ItemList";
import { getData } from "../../utils/get-data";

export const ItemListContainer = ({onAdd, greeting}) => {

    const [products, setProducts] = useState([]);

    useEffect(() =>{

        const waitForData = async () => {
            let data = await getData('zapatillas');
            let productos = data.map(element => {
                return {
                    id: element.id,
                    title: element.title,
                    img: element.thumbnail,
                    price: element.price,
                    stock: element.available_quantity,
                    cantidadComprada: 0
                }
            });
            setProducts(productos);
        }

        setTimeout(() => {waitForData()}, 2000);
    }, [])

    const changeProduct = (product, count) => {

        const productosModificados = products.map(producto => {
            if(producto.id === product.id){
                return product;
            }
            return producto;
        });
        setProducts(productosModificados);

        let productoComprado = product;
        productoComprado.cantidadComprada = count;
        onAdd(productoComprado);
    }

    return(
        <>
            <Row style={{ marginLeft: '1rem' }}>
                <h2>{greeting}</h2>
            </Row>
            <ItemList onAdd={changeProduct} items={products}/>
        </>
    )
}