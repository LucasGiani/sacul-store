import { useState } from "react";
import { Row } from "react-bootstrap";
import { CardComponent } from "../../components/CardComponent";

export const ItemListContainer = ({onAdd, greeting}) =>{

    const [products, setProducts] = useState(
        [
            { id: 1, name: 'Zapatillas', description: 'Running', price: 20000, cantidadComprada: 0, stock: 5 },
            { id: 2, name: 'Short', description: 'Running', price: 5000, cantidadComprada: 0, stock: 5 },
            { id: 3, name: 'Medias', description: 'Fútbol', price: 5000, cantidadComprada: 0, stock: 5 },
            { id: 4, name: 'Pantalón', description: 'Gym', price: 5000, cantidadComprada: 0, stock: 5 },
            { id: 5, name: 'Buzo', description: 'Training', price: 5000, cantidadComprada: 0, stock: 5 },
            { id: 6, name: 'Campera', description: 'Mountain', price: 5000, cantidadComprada: 0, stock: 5 },
            { id: 7, name: 'Camiseta', description: 'Fútbol', price: 5000, cantidadComprada: 0, stock: 0 }
        ]);

    const changeProduct = (product, count) => {

        const productosModificados = products.map(producto => {
            if(producto.id === product.id){
                return product;
            }
            return producto;
        });
        setProducts(productosModificados);

        let productoComprado = product;
        productoComprado.cantidadComprada = count;
        onAdd(productoComprado);
    }

    return(
        <>
            <Row style={{ marginLeft: '1rem' }}>
                <h2>{greeting}</h2>
            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}> 
                {products.filter(product => product.stock !== 0).map((product) => 
                    <CardComponent key={product.id} onAdd={changeProduct} product={product} />
                )}
            </Row>
        </>
    )
}