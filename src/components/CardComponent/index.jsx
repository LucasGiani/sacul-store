import { useState } from "react";
import { Card, CardImg } from "react-bootstrap"
import { ItemCount } from "../ItemCount";

export const CardComponent = ({product, onAdd}) => {

    const [producto, setProduct] = useState(product);

    const comprar = (count) => {
        product.stock = product.stock - count;
        setProduct({...product});
        onAdd(product, count);
    };

    return(
        <Card style={{ textAlign: 'center', width: '18rem', padding: '2rem', marginLeft: '1rem', marginBottom: '1rem', backgroundColor: "#E2E2E2" }}>
            <CardImg variant="top" src={producto.img} />
            <Card.Body>
                <Card.Title>{producto.title}</Card.Title>
                <Card.Text><strong>{`$${producto.price}`}</strong></Card.Text>
                <Card.Text>Cantidad disponible: {producto.stock}</Card.Text>
                <ItemCount stock={producto.stock} initial={1} onAdd={comprar}/>
            </Card.Body>
        </Card>
    )
}