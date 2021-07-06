import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ItemList } from "../../components/ItemList";
import { Loader } from "../../components/Loader";
import { SUBCATEGORY } from "../../utils/const";
import { getDataByText } from "../../utils/get-data";

export const ItemListContainer = ({onAdd, greeting, products, setProducts}) => {

    const [header, setHeader] = useState(greeting);
    const [productosDeCategoria, setProductosDeCategoria] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const isCategoriaExistente = !!SUBCATEGORY[parseInt(id || "1")]?.title;
        if(!isCategoriaExistente) return window.alert('La categoría no existe');

        setHeader(id ? `Listado de ${SUBCATEGORY[parseInt(id)].title}` : greeting);
        const waitForData = async () => {
            let data = await getDataByText(SUBCATEGORY[parseInt(id || "1")]?.title);
            let productos = data.map(element => {
                return {
                    id: element.id,
                    title: element.title,
                    img: element.thumbnail.replace('I.jpg', 'O.jpg'),
                    price: element.price,
                    stock: element.available_quantity,
                    cantidadComprada: 0,
                    subcategory: parseInt(id || "1")
                }
            });
            setProductosDeCategoria(productos);
            setLoading(false);
            setProducts(products.concat(productos));
        }

        if(!productosDeCategoria.length || (!!productosDeCategoria.length && productosDeCategoria[0].subcategory !== parseInt(id || "1"))){
            let productosDeLaCategoria = products.filter(producto => producto.subcategory === parseInt(id || "1"));

            if(!productosDeLaCategoria.length){
                setProductosDeCategoria([]);
                setLoading(true);
                setTimeout(() => {waitForData()}, 2000);
            }
            else
                setProductosDeCategoria(productosDeLaCategoria);
        }
    }, [id, products])

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
            <Row style={{ marginLeft: '2rem' }}>
                <h2>{header}</h2>
            </Row>

            <Loader isShown={isLoading}>Cargando listado de productos...</Loader>
            
            {!!productosDeCategoria.length && <ItemList onAdd={changeProduct} items={productosDeCategoria}/>}
        </>
    )
}