import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";
import "./styles.css";

export const CardWidget = ({count}) =>{
    
    return (
        <>
            <FontAwesomeIcon className='cart'
                icon={faShoppingCart} 
                size='2x'/>
            <Badge className='cart-count' pill variant="primary">
                {count}
            </Badge>
        </>
    )
}