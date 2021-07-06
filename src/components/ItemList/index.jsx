import { Row } from "react-bootstrap";
import { CardComponent } from "../../components/CardComponent";
import './styles.css'

export const ItemList = ({items, onAdd}) => {

    return(
        <Row className='products-row'> 
            {items.filter(item => item.stock !== 0).map((item) => 
                <CardComponent key={item.id} onAdd={onAdd} product={item} />
            )}
        </Row>
    );
}