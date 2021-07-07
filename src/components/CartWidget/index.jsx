import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "./styles.css";

export const CardWidget = ({count}) =>{
    
    return (
        <>
            <NavLink to={'/cart'}>
                <FontAwesomeIcon color='blue' icon={faShoppingCart} size='2x'/>
                <Badge className='cart-count' pill variant="primary">
                    {count}
                </Badge>
            </NavLink>
        </>
    )
}