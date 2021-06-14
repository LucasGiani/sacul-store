import { useState } from "react";
import { Button, Card, CardImg } from "react-bootstrap"

export const CardComponent = ({product}) => {

    const [producto, setProduct] = useState(product);

    const comprar = (product) => {
        product.fueComprado =  'Fue comprado';
        product.comprado = true;
        setProduct({...product});
    }; 

    return(
        <Card style={{ width: '18rem', padding: '2rem', marginLeft: '1rem', marginBottom: '1rem', backgroundColor: "#E2E2E2" }}>
            <CardImg variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{producto.name}</Card.Title>
                <Card.Text>{producto.description}</Card.Text>
                <Card.Text><strong>{`$${producto.price}`}</strong></Card.Text>
                {producto.comprado &&
                    <Card.Text><strong>{producto.fueComprado}</strong></Card.Text>
                }
                <Button variant="primary" disabled={producto.comprado} onClick={() => {comprar(producto)}}>Comprar</Button>
            </Card.Body>
        </Card>
    )
}