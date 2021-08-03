import { Row } from "react-bootstrap";
import { CardComponent } from "../../components/CardComponent";
import './styles.css'

export const ItemList = ({ items }) => {

    return(
        <Row className='products-row'> 
            {!!items.length && items.filter(item => item.stock > 0).map((item) => 
                <CardComponent key={item.id} product={item} />
            )}
        </Row>
    );
}