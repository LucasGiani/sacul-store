import {Nav, Navbar, NavbarBrand, NavDropdown, Form } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import { CardWidget } from '../CartWidget';
import { NavLink } from 'react-router-dom';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CATEGORIES } from '../../utils/const';
import './styles.css';

export const NavBar = ({cart}) => {

    const getCantProductos = () => {
        let cantidad = 0;
        cart.map(producto => cantidad += producto.cantidadComprada );

        return cantidad;
    }

    const DropDown = ({category}) => {
        const {id, title, subcategories} = category;
        const categoryTitle = capitalizeFirstLetter(title);
        return(
            <NavDropdown key={id} title={categoryTitle} id={id}>
                {subcategories.map(subcategory => (
                        <NavDropdown.Item key={subcategory.id}>
                            <NavLink id={subcategory.id} to={`/category/${subcategory.id}`}>
                                {capitalizeFirstLetter(subcategory.title)}
                            </NavLink>
                        </NavDropdown.Item>
                ))}
            </NavDropdown>
        );
    }

    return (
        <Navbar className='nav-bar' bg="light" expand="md">
            <NavbarBrand>
                <NavLink to={'/'}>
                    <FontAwesomeIcon className='icon' size='2x' icon={faMusic} title='E-Music'/>
                </NavLink>
            </NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {CATEGORIES.map(category =>
                        DropDown({category})
                    )}
                </Nav>
                <Form inline>
                    <CardWidget count={getCantProductos()}/>
                </Form>
            </NavbarCollapse>
        </Navbar>
    );
}