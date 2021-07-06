import { Card, Col, Row } from "react-bootstrap";
import { ItemCount } from "../ItemCount";
import './styles.css';

export const ItemDetail = ({product, onAdd}) => {

    const comprar = (count) => {
        product.stock = product.stock - count;
        onAdd(product, count);
    };

    return(
        <Col md={12}>
            <Card className='card-detail'>
                <Col md={12} style={{ marginBottom: '1rem' }}>
                    <h2>Detalle de producto</h2>
                </Col>
                <Row className='detail'>
                    <Col md={7} style={{ textAlign: "center"}}>
                        <img className='image' src={product.img} />
                    </Col>
                    <Col md={5}>
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text><strong>{`$${product.price}`}</strong></Card.Text>
                            <Row className='item-count'>
                                <Card.Text>Cantidad disponible: {product.stock}</Card.Text>
                                <ItemCount stock={product.stock} initial={1} onAdd={comprar}/>
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}