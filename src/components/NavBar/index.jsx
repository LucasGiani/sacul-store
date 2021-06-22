import {Nav, Navbar, NavbarBrand, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import { CardWidget } from '../CartWidget';

export const NavBar = ({cart}) => {

    const categories = ['calzado', 'indumentaria','accesorios'];

    const getCantProductos = () => {
        let cantidad = 0;
        cart.map(producto => cantidad += producto.cantidadComprada );

        return cantidad;
    }

    const DropDown = ({title, categories}) => {

        return(
            <NavDropdown title={capitalizeFirstLetter(title)} id={`${title}-categories`}>
                {categories.map(category => (
                    <NavDropdown.Item key={category} href={`${title}/${category}`}>{capitalizeFirstLetter(category)}</NavDropdown.Item>
                ))}
                <NavDropdown.Divider/>
                <NavDropdown.Item href={`${title}/ofertas`}>Ofertas</NavDropdown.Item>
            </NavDropdown>
        );
    }

    return (
        <Navbar bg="light" expand="md">
            <NavbarBrand key={1} href="home">
                <CardWidget title={'E-COMMERCE'}/>
            </NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {DropDown({title:'hombre', categories})}
                    {DropDown({title:'mujer', categories})}
                    <span style={{ padding: '.5rem' }}>Cantidad de productos en el carrito: {getCantProductos()}</span>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Búsqueda" className="mr-sm-2" />
                    <Button variant="outline-success">Buscar</Button>
                </Form>
            </NavbarCollapse>
        </Navbar>
    );
}