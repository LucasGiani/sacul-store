import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../../components/ItemList";
import { Loader } from "../../components/Loader";
import { CartContext } from "../../context/cart-context";
import { SUBCATEGORY } from "../../utils/const";

export const ItemListContainer = () => {
    const { onAddProduct, greeting, products, onChangeProduct, waitForData, cantidadPaginada } = useContext(CartContext);
    const [header, setHeader] = useState(greeting);
    const [productosDeCategoria, setProductosDeCategoria] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const idCategoria = parseInt(id || "1");
        setHeader(id ? `Listado de ${SUBCATEGORY[idCategoria].title}` : greeting);
        const isCategoriaExistente = !!SUBCATEGORY[idCategoria]?.title;
        if(!isCategoriaExistente) return window.alert('La categoría no existe');

        const getData = async () => {
            setLoading(true);
            let productos = await waitForData(idCategoria);
            setProductosDeCategoria(productos);
            setLoading(false);
        }

        if (!productosDeCategoria.length ||
            (!!productosDeCategoria.length && productosDeCategoria[0].category !== idCategoria)) {
            
            let productosDeLaCategoria = products.filter(producto => producto.category === idCategoria);
            if (productosDeLaCategoria.length < cantidadPaginada) {    
                getData();
            }
            else
                setProductosDeCategoria(productosDeLaCategoria);
        }

    }, [id])

    const changeProduct = (product, count) => {

        onChangeProduct(product);
        onAddProduct(product, count);
    }

    return(
        <>
            {isLoading ? 
                <Loader isShown={isLoading}>Cargando productos...</Loader>
                :
                <>
                    <h2 style={{ marginLeft: '2rem', paddingTop: '1rem' }}>{header}</h2>
                    {!!productosDeCategoria.length && <ItemList onAdd={changeProduct} items={productosDeCategoria} />}
                </>
            }
            

            
        </>
    )
}