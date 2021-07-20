import { useEffect, useState, useContext } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ItemList } from "../../components/ItemList";
import { CartContext } from "../../context/cart-context";
import { SUBCATEGORY } from "../../utils/const";

export const ItemListContainer = () => {
    const { onAddProduct, greeting, products, setProducts, waitForData, cantidadPaginada } = useContext(CartContext);
    const [header, setHeader] = useState(greeting);
    const [productosDeCategoria, setProductosDeCategoria] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        let mounted = true;

        const idCategoria = parseInt(id || "1");
        setHeader(id ? `Listado de ${SUBCATEGORY[idCategoria].title}` : greeting);
        const isCategoriaExistente = !!SUBCATEGORY[idCategoria]?.title;
        if(!isCategoriaExistente) return window.alert('La categoría no existe');

        const getData = async () => {
            let productos = await waitForData(idCategoria);
            if (mounted)
                setProductosDeCategoria(productos);
        }

        if (!productosDeCategoria.length ||
            (!!productosDeCategoria.length && productosDeCategoria[0].category !== idCategoria)) {
            
            let productosDeLaCategoria = products.filter(producto => producto.category === idCategoria);
            if (productosDeLaCategoria.length < cantidadPaginada)
                getData();
            else
                setProductosDeCategoria(productosDeLaCategoria);
        }

        return () => mounted = false;
    }, [id])

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
        productoComprado.subTotal = count * product.price;
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