
import {Nav, Navbar, NavbarBrand, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter';

export const NavBar = () => {

    const categories = ['calzado', 'indumentaria','accesorios'];

    const DropDown = ({title, categories}) => {

        return(
            <NavDropdown title={capitalizeFirstLetter(title)} id={`${title}-categories`}>
                {categories.map(category => (
                    <NavDropdown.Item href={`${title}/${category}`}>{capitalizeFirstLetter(category)}</NavDropdown.Item>
                ))}
                <NavDropdown.Divider/>
                <NavDropdown.Item href={`${title}/ofertas`}>Ofertas</NavDropdown.Item>
            </NavDropdown>
        );
    }

    return (
            <Navbar bg="light" expand="lg">
                <NavbarBrand href="home">E-COMMERCE</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {DropDown({title:'hombre', categories})}
                        {DropDown({title:'mujer', categories})}
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Busqueda" className="mr-sm-2" />
                        <Button variant="outline-success">Buscar</Button>
                    </Form>
                </NavbarCollapse>
            </Navbar>
    );
}