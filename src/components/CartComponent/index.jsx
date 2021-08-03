import { useContext, useState } from "react";
import { CartContext } from "../../context/cart-context";
import { NavLink } from 'react-router-dom';
import { Alert, Col, Card, Row, Button } from "react-bootstrap";
import { CartItem } from "../CartItem";
import "./styles.css";
import { BuyerForm } from "../BuyerForm";

export const Cart = () => {

    const { cart, getTotal, deleteAll, cleanCart } = useContext(CartContext);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <>
            <Col lg={12} className='inline'>
                <Col lg={6} className='inline-came-back-link'>
                    <NavLink to={'/'} onClick={() => { isSuccess && cleanCart() }}>Volver</NavLink>
                </Col>
                <Col lg={6} className='inline-end'>
                    {!isSuccess && cart.length > 0 && <Button className="delete-all-button" onClick={() => { deleteAll() }}>Vaciar carrito</Button>}
                </Col>
            </Col>
            {cart.length > 0 ?
                <>
                    {cart.map((item, index) =>
                        <Col lg={12} key={index}>
                            <CartItem cartItem={item} readOnly={isSuccess}/>
                        </Col>
                    )}
                    <Col lg={12}>
                        <Card className="card-total">
                            <h3 className="inline-end">{`Total: $${getTotal()}`}</h3>
                        </Card>
                    </Col>
                    <Col lg={12}>
                        <Card className="card-form-buyer">
                            <BuyerForm onSuccess={() => setIsSuccess(true)} />
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
                </>
            }
        </>
    )
}