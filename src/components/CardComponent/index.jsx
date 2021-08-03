import { useContext } from "react";
import { Card } from "react-bootstrap"
import { ItemCount } from "../ItemCount";
import { Link } from "react-router-dom";
import './styles.css'
import { CartContext } from "../../context/cart-context";

export const CardComponent = ({ product }) => {
    
    const { onAddProduct } = useContext(CartContext);

    return(
        <>
            {!!product &&
                <Card className='product-card'>
                    <Link to={`/item/${product.id}`}>
                        <img className='card-image' alt={product.img} src={product.img} />
                    </Link>
                    <Card.Body>
                        <Card.Title>
                            <Link className='product-title' to={`/item/${product.id}`}>{product.name}</Link>
                        </Card.Title>
                        <Card.Text><strong>{`$${product.price}`}</strong></Card.Text>
                        <Card.Text>Cantidad disponible: {product.stock}</Card.Text>
                        <Card.Text>
                            <Link to={`/item/${product.id}`}>Ver detalle</Link>    
                        </Card.Text>
                        <ItemCount stock={product.stock} initial={1} onAdd={(count) => onAddProduct(product, count)}/>
                    </Card.Body>
                </Card>
            }
        </>
    )
}