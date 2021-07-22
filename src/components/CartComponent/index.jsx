import { useContext, useState } from "react";
import { CartContext } from "../../context/cart-context";
import { NavLink } from 'react-router-dom';
import { Alert, Col, Card, Row } from "react-bootstrap";
import { CartItem } from "../CartItem";
import "./styles.css";
import { BuyerForm } from "../BuyerForm";

export const Cart = () => {

    const { cart, getTotal } = useContext(CartContext);

    return (
        <>
            {cart.length > 0 ?
                <>
                    {cart.map((item, index) =>
                        <Col lg={12} key={index}>
                            <CartItem cartItem={item} />
                        </Col>
                    )}
                    <Col lg={12}>
                        <Card className="card-total">
                            <h3 className="inline-end">{`Total: $${getTotal()}`}</h3>
                        </Card>
                    </Col>
                    <Col lg={12}>
                        <Card className="card-form-buyer">
                            <BuyerForm />
                        </Card>
                    </Col>
                </>
                :
                <>
                    <Row className='row-alert'>
                        <Alert variant={'dark'} className='no-products-alert'>
                            No hay ningún producto agregado al carrito
                        </Alert>
                    </Row>
                    <NavLink className='inline-end' to={'/'}>Volver</NavLink>
                </>
            }
        </>
    )
}