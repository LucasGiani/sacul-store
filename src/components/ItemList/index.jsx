import { Row } from "react-bootstrap";
import { CardComponent } from "../../components/CardComponent";

export const ItemList = ({items, onAdd}) => {

    return(
        <Row style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}> 
            {items.filter(item => item.stock !== 0).map((item) => 
                <CardComponent key={item.id} onAdd={onAdd} product={item} />
            )}
        </Row>
    );
}