import React, { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Counter } from "../Counter/counter";
import "./styles.css";

const CartItemComponent = ({ cartItem, readOnly }) => {

    const { removeProduct, updateCantidadComprada } = useContext(CartContext);
    
    const product = cartItem.producto;
    const cantidadComprada = cartItem.cantidadComprada;
    const subTotal = cartItem.subTotal;

    return (
        <Card className='cart-item-card'>
            <Card.Body>
                <Col lg={12} style={{ marginBottom: '1rem' }}>
                    <Card.Title>{product.name}</Card.Title>
                </Col>
                <Col lg={12} className='cart-item-line'>
                    <Col lg={3}>
                        <img className='card-image' alt={product.img} src={product.img} />
                    </Col>
                    <Col lg={2}>
                        <Card.Text><strong>{`Cant. disponible: ${product.stock}`}</strong></Card.Text>
                    </Col>
                    <Col lg={2}>
                        {readOnly ?
                            <Card.Text><strong>{`Cantidad comprada: ${cantidadComprada}`}</strong></Card.Text>
                            :
                            <Counter
                                count={cantidadComprada}
                                stock={product.stock}
                                onIncrement={(amount) => updateCantidadComprada(product, amount)}
                                onDecrement={(amount) => updateCantidadComprada(product, amount)}
                            />
                        }
                    </Col>
                    <Col lg={2}>
                        <Card.Text><strong>{`Precio: $${product.price}`}</strong></Card.Text>
                    </Col>
                    <Col lg={2}>
                        <Card.Text><strong>{`Subtotal: $${subTotal.toFixed(2)}`}</strong></Card.Text>
                    </Col>
                    <Col lg={1}>
                        {!readOnly && <FontAwesomeIcon className='remove-button' icon={faTrashAlt} size='2x' onClick={() => removeProduct(product)} />}
                    </Col>
                </Col>
            </Card.Body>
        </Card>
    );
}

const validateItemProps = (prevProps, nextProps) => {
    return prevProps.cartItem.cantidadComprada === nextProps.cartItem.cantidadComprada &&
        prevProps.cartItem.subTotal === nextProps.cartItem.subTotal &&
        prevProps.readOnly === nextProps.readOnly;
}

export const CartItem = React.memo(CartItemComponent, validateItemProps);