import {Nav, Navbar, NavbarBrand, NavDropdown, Form } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { capitalizeFirstLetter } from '../../utils/capitalize-first-letter';
import { CardWidget } from '../CartWidget';
import { NavLink } from 'react-router-dom';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NAVBAR_CATEGORIES } from '../../utils/const';
import { CartContext } from "../../context/cart-context";
import { useContext } from 'react';
import './styles.css';

export const NavBar = () => {

    const { getCantidadComprada } = useContext(CartContext);

    const cantidadComprada = getCantidadComprada();

    const DropDown = ({category}) => {
        const {id, title, subcategories} = category;
        const categoryTitle = capitalizeFirstLetter(title);
        return(
            <NavDropdown key={id} title={categoryTitle}>
                {subcategories.map(subcategory => (
                    <NavDropdown.Item key={subcategory.id}>
                        <Nav.Link as={NavLink} id={subcategory.id} to={`/category/${subcategory.id}`}>
                            {capitalizeFirstLetter(subcategory.title)}
                        </Nav.Link>
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        );
    }

    return (
        <Navbar className='nav-bar' bg="light" expand="md">
            <NavbarBrand>
                <NavLink to={'/'}>
                    <FontAwesomeIcon color='blue' size='2x' icon={faMusic} title='E-Music'/>
                </NavLink>
            </NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {NAVBAR_CATEGORIES.map(category =>
                        DropDown({category})
                    )}
                </Nav>
                <Form inline>
                    {!!cantidadComprada && <CardWidget count={cantidadComprada} />}
                </Form>
            </NavbarCollapse>
        </Navbar>
    );
}