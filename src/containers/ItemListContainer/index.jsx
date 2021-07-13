import { useEffect, useState, useContext } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ItemList } from "../../components/ItemList";
import { CartContext } from "../../context/cart-context";
import { SUBCATEGORY } from "../../utils/const";

export const ItemListContainer = () => {
    const { onAddProduct, greeting, products, setProducts, waitForData } = useContext(CartContext);
    const [header, setHeader] = useState(greeting);
    const [productosDeCategoria, setProductosDeCategoria] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const isCategoriaExistente = !!SUBCATEGORY[parseInt(id || "1")]?.title;
        if(!isCategoriaExistente) return window.alert('La categoría no existe');

        setHeader(id ? `Listado de ${SUBCATEGORY[parseInt(id)].title}` : greeting);

        if (!productosDeCategoria.length ||
            (!!productosDeCategoria.length && productosDeCategoria[0].subcategory !== parseInt(id || "1"))) {
            let productosDeLaCategoria = products.filter(producto => producto.subcategory === parseInt(id || "1"));

            if(!productosDeLaCategoria.length){
                setProductosDeCategoria([]);
                productosDeLaCategoria = waitForData(id);
            }
            
            setProductosDeCategoria(productosDeLaCategoria);
        }
    }, [id, productosDeCategoria])

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
        onAddProduct(productoComprado);
    }

    return(
        <>
            <Row style={{ marginLeft: '2rem' }}>
                <h2>{header}</h2>
            </Row>
           
            {!!productosDeCategoria.length && <ItemList onAdd={changeProduct} items={productosDeCategoria}/>}
        </>
    )
}