import { useState } from "react";
import { Card } from "react-bootstrap"
import { ItemCount } from "../ItemCount";
import { Link } from "react-router-dom";
import './styles.css'

export const CardComponent = ({product, onAdd}) => {

    const [producto, setProduct] = useState(product);

    const comprar = (count) => {
        producto.stock = producto.stock - count;
        setProduct({...producto});
        onAdd(producto, count);
    };

    return(
        <>
            {!!producto &&
                <Card className='product-card'>
                    <Link to={`/item/${producto.id}`}>
                        <img className='card-image' src={producto.img} />
                    </Link>
                    <Card.Body>
                        <Card.Title>
                            <Link className='product-title' to={`/item/${producto.id}`}>{producto.title}</Link>
                        </Card.Title>
                        <Card.Text><strong>{`$${producto.price}`}</strong></Card.Text>
                        <Card.Text>Cantidad disponible: {producto.stock}</Card.Text>
                        <Card.Text>
                            <Link to={`/item/${producto.id}`}>Ver detalle</Link>    
                        </Card.Text>
                        <ItemCount stock={producto.stock} initial={1} onAdd={comprar}/>
                    </Card.Body>
                </Card>
            }
        </>
    )
}