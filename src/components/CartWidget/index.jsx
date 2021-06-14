import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const CardWidget = ({title}) =>{
    
    return (
        <>
            <FontAwesomeIcon style={{ color: 'grey'}} icon={faShoppingCart} title={title}/>
        </>
    )
}