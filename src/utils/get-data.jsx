import { getFirestore } from "../firebase/client";

export const getDataByText = async (text) => {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${text}`
    );
    const data = await response.json();
    return data.results;
};

export const getDataByCategory = async (categorias) => {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?category=${categorias}`
    );
    const data = await response.json();
    return data.results;
};

export const getDataByProductId = async (id) => {
    const response = await fetch(
        `https://api.mercadolibre.com/items/${id}`
    );
    const data = await response.json();
    return data;
};

export const getDataFirebaseByCategory = async (category = 1) => {
    const DB = getFirestore(); // Conexion a la base de datos
    const COLLECTION = DB.collection("productos").where('category', '==', category);
    const RESPONSE = await COLLECTION.get();

    let data = RESPONSE.docs.map(doc => doc.data()).map(element => {
            return {
                id: element.id,
                name: element.name,
                img: element.img.replace('I.jpg', 'O.jpg'),
                price: element.price,
                stock: element.stock,
                category: element.category,
                cantidadComprada: 0, //responsabilidad y variable correspondiente al Cart
                subTotal: 0 //responsabilidad y variable correspondiente al Cart
            }
        });

    return data;
}

export const getDataFirebaseByProductId = async (productId) => {
    const DB = getFirestore(); // Conexion a la base de datos
    const COLLECTION = DB.collection("productos").where('id','==',productId);
    const RESPONSE = await COLLECTION.get();
    let dataFirebase = RESPONSE.docs[0]?.data();

    if (!dataFirebase) return;
        
    let data = {
            id: dataFirebase.id,
            name: dataFirebase.name,
            img: dataFirebase.img.replace('I.jpg', 'O.jpg'),
            price: dataFirebase.price,
            stock: dataFirebase.stock,
            category: dataFirebase.category,
            cantidadComprada: 0, //responsabilidad y variable correspondiente al Cart
            subTotal: 0 //responsabilidad y variable correspondiente al Cart
        };

    return data;
}