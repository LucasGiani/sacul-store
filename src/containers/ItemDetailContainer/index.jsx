import { useState, useEffect, useContext } from "react";
import { Alert, Row } from "react-bootstrap";
import { useParams, NavLink } from "react-router-dom";
import { ItemDetail } from "../../components/ItemDetail";
import { Loader } from "../../components/Loader";
import { CartContext } from "../../context/cart-context";
import "./styles.css";

export const ItemDetailContainer = () => {
    const { waitForProduct } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [errorProductNotFound, setErrorProductNotFound] = useState('');
    const { id } = useParams();
    
    useEffect(() => {
        if(!id) return window.alert('Id de producto no proporcionado');

        const getData = async () => {
            setLoading(true);
            try {
                let producto = await waitForProduct(id);
                setProduct(producto); 
            }
            catch (e) {
                setErrorProductNotFound(`El producto con id ${id} no existe`);
            }
            finally {
                setLoading(false);
            }
        }
       
        getData();
        
    }, [id]);

    return(
        <>
            {isLoading ? 
                <Loader isShown={isLoading}>Cargando detalle del producto...</Loader>
                :
                <>
                    <NavLink className='inline-start' to={'/'}>Volver</NavLink>
                    {product && !errorProductNotFound ?
                        <ItemDetail product={product} />
                        :
                        <Row className='error-alert'>
                            <Alert variant={'danger'} className='no-product-found'>
                                {errorProductNotFound}
                            </Alert>
                        </Row>
                    }
                </>
            }
        </>
    )
}