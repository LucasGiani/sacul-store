import { Card, CardImg, Col, Row } from "react-bootstrap";
import { ItemCount } from "../ItemCount";

export const ItemDetail = ({product, onAdd}) => {

    const comprar = (count) => {
        product.stock = product.stock - count;
        onAdd(product, count);
    };

    return(
        <>
            {!!product &&
                <Card style={{ padding: '2rem', marginLeft: '1rem', marginBottom: '1rem', backgroundColor: "#E2E2E2" }}>
                        <Col md={12} style={{ marginBottom: '1rem' }}>
                            <h2>Detalle de producto</h2>
                        </Col>
                        <Row style={{display: 'flex', flexDirection: 'row', textAlign: 'center' }} >
                            <Col md={7}>
                                <CardImg variant="top" src={product.img} />
                            </Col>
                            <Col md={5}>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text><strong>{`$${product.price}`}</strong></Card.Text>
                                    <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                        <Card.Text>Cantidad disponible: {product.stock}</Card.Text>
                                        <ItemCount stock={product.stock} initial={1} onAdd={comprar}/>
                                    </Row>
                                </Card.Body>
                            </Col>
                        </Row>
                </Card>
            }
        </>
    );
}