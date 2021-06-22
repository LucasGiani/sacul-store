import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const CardWidget = ({title}) =>{
    
    return (
        <>
            <FontAwesomeIcon style={{ marginLeft: '.5rem', color: 'grey'}} icon={faShoppingCart} title={title}/>
        </>
    )
}