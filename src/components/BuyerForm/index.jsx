import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { CartContext } from "../../context/cart-context";
import "./styles.css";


export const BuyerForm = ({ onSuccess }) => {

    const { createOrder } = useContext(CartContext);
    const [form, setForm] = useState(new BuyForm());
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [onSuccessOrderId, setOnSuccessOrderId] = useState(null);

    const validate = (form) => {
        const { name, email, emailValidated, phone } = form;
    
        name.error = !name.value ? 'Nombre es requerido' : '';

        email.error = !email.value ? 'E-mail es requerido' :
            (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) ? 'E-mail no es válido' : '';
        
        emailValidated.error = !!email.value && email.value !== emailValidated.value ? 'E-mail ingresado no coincide' : '';
        
        phone.error = !phone.value ? 'El número de teléfono es requerido' :
            phone.value.trim().length < 6 ? 'El número de teléfono es demasiado corto' : '';
    };
    
    const onBlur = (event) => {
        const name = event.target.name;
        setForm(_form => {
            if (_form[name]) _form[name].touched = true;
            validate(_form);
            return new BuyForm(_form);
        });
    };
    
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setErrorMsg('');
        setForm(_form => {
            if (_form[name]) {
                _form[name].value = value;
                _form[name].touched = true;
            }
            validate(_form);
            return new BuyForm(_form);
        });
    };

    const onFormSubmit = async (event) => {
        event?.preventDefault();
        setLoading(true);

        try {
            let orderId = await createOrder(form.name.value, form.email.value, form.phone.value);
            setOnSuccessOrderId(orderId);
            onSuccess();
        }
        catch (e) {
            setErrorMsg('Ha ocurrido un error al registrar la orden, intente nuevamente');
        }
        finally {
            setLoading(false);
        }
    };
    
    const isFormValid = () => Object.values(form).every((item) => item.touched && !item.error);

    return (
        <>
            {!onSuccessOrderId ?
                <Form className='form' onSubmit={onFormSubmit}>
                    <h3 className="inline-start">Finalizar Compra</h3>

                    <div className='form-input'>
                        <Form.Group controlId="email">
                            <Form.Label>Ingrese e-mail</Form.Label>
                            <Form.Control type="email"
                                name="email"
                                placeholder="Tu correo electrónico"
                                required
                                disabled={isLoading}
                                value={form.email.value}
                                isInvalid={form.email.touched && !!form.email.error}
                                onBlur={onBlur}
                                onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                {form.email.error}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="emailValidated">
                            <Form.Label>Ingrese e-mail nuevamente</Form.Label>
                            <Form.Control type="email"
                                name="emailValidated"
                                placeholder="Tu correo electrónico"
                                required
                                disabled={isLoading}
                                value={form.emailValidated.value}
                                isInvalid={form.emailValidated.touched && !!form.emailValidated.error}
                                onBlur={onBlur}
                                onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                {form.emailValidated.error}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="name">
                            <Form.Label>Ingrese nombre y apellido completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Tu nombre completo"
                                required
                                disabled={isLoading}
                                value={form.name.value}
                                isInvalid={form.name.touched && !!form.name.error}
                                onBlur={onBlur}
                                onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                {form.name.error}
                            </Form.Control.Feedback>
                        </Form.Group>
                
                        <Form.Group controlId="phone">
                            <Form.Label>Ingrese número de Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Ej: +54 341 5678 9876"
                                required
                                disabled={isLoading}
                                value={form.phone.value}
                                isInvalid={form.phone.touched && !!form.phone.error}
                                onBlur={onBlur}
                                onChange={onChange} />
                            <Form.Control.Feedback type="invalid">
                                {form.phone.error}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            className="button"
                            variant="primary"
                            disabled={isLoading || !isFormValid()}
                            onClick={onFormSubmit}
                        >
                            Comprar
                        </Button>

                        {!!errorMsg &&
                            <Alert className="mt-3" variant="danger">
                                <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                                {errorMsg}
                            </Alert>}
                    </div>
                </Form>
                :
                <>
                    <Alert className="order-success" variant="success">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        Su orden de compra fue realizada con éxito. Su número de orden es: <strong>{onSuccessOrderId}</strong>
                    </Alert>
                </>
            }
        </>
    )
}
            
class FormItem {
    disabled;
    error;
    required;
    touched;
    value;
  
    constructor(initialValue, required = true) {
        if (initialValue !== undefined && initialValue !== null)
            this.value = initialValue;
        this.required = required;
    }
}

class BuyForm {
    name = new FormItem('');
    email = new FormItem('');
    emailValidated = new FormItem('');
    phone = new FormItem('');
  
    constructor(params) {
      if (params) Object.assign(this, params);
    }
}