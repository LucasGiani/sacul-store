import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Counter } from "../Counter/counter";
import "./styles.css";

const CartItemComponent = ({ product }) => {

    const { removeProduct, updateCantidadComprada  } = useContext(CartContext);

    return (
        <Card className='cart-item-card'>
            <Card.Body>
                <Col lg={12} style={{ marginBottom: '1rem' }}>
                    <Card.Title>{product.title}</Card.Title>
                </Col>
                <Col lg={12} className='cart-item-line'>
                    <Col lg={3}>
                        <img className='card-image' alt={product.img} src={product.img} />
                    </Col>
                    <Col lg={2}>
                        <Counter
                            count={product.cantidadComprada}
                            stock={product.stock}
                            onIncrement={(amount) => updateCantidadComprada(product, amount)}
                            onDecrement={(amount) => updateCantidadComprada(product, amount)}
                        />
                    </Col>
                    <Col lg={3}>
                        <Card.Text><strong>{`Precio: $${product.price}`}</strong></Card.Text>
                    </Col>
                    <Col lg={3}>
                        <Card.Text><strong>{`Subtotal: $${product.subTotal.toFixed(2)}`}</strong></Card.Text>
                    </Col>
                    <Col lg={1}>
                        <FontAwesomeIcon className='remove-button' icon={faTrashAlt} size='2x' onClick={() => removeProduct(product)} />
                    </Col>
                </Col>
            </Card.Body>
        </Card>
    );
}

const validateItemProps = (prevProps, nextProps) => {
    return prevProps.cantidadComprada === nextProps.cantidadComprada &&
        prevProps === nextProps &&
        prevProps.stock === nextProps.stock;
}

export const CartItem = React.memo(CartItemComponent, validateItemProps);