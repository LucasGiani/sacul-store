import { Row } from "react-bootstrap";
import { CardComponent } from "../../components/CardComponent";

export const ItemListContainer = ({greeting}) =>{

    const products = [
        { id: 1, name: 'Zapatillas', description: 'Running', price: 20000, comprado: false },
        { id: 2, name: 'Short', description: 'Running', price: 5000, comprado: false },
        { id: 3, name: 'Medias', description: 'Fútbol', price: 5000, comprado: false },
        { id: 4, name: 'Pantalón', description: 'Gym', price: 5000, comprado: false },
        { id: 5, name: 'Buzo', description: 'Training', price: 5000, comprado: false },
        { id: 6, name: 'Campera', description: 'Mountain', price: 5000, comprado: false },
        { id: 7, name: 'Camiseta', description: 'Fútbol', price: 5000, comprado: false }
    ];

    return(
        <>
            <Row style={{ marginLeft: '1rem' }}>
                <h2>{greeting}</h2>
            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}> 
                {products.map((product) => 
                    <CardComponent key={product.id} product={product} />
                )}
            </Row>
        </>
    )
}