import { getFirestore } from "../firebase/client";

export const getDataFirebaseByCategory = async (category = 1) => {
    const DB = getFirestore();
    const COLLECTION = DB.collection("productos").where('category', '==', category);
    const RESPONSE = await COLLECTION.get();

    let data = RESPONSE.docs.map(doc => {
            let elementData = doc.data();
            return {
                id: doc.id,
                name: elementData.name,
                img: elementData.img,
                price: elementData.price,
                stock: elementData.stock,
                category: elementData.category,
           }
        });

    return data;
}

export const getDataFirebaseByProductId = async (productId) => {
    const DB = getFirestore();
    const COLLECTION = DB.collection("productos").doc(productId);
    const RESPONSE = await COLLECTION.get();

    if (!RESPONSE.exists)
        throw new Error('Product Not Found');
    
    const dataFirebase = RESPONSE.data();
        
    const data = {
            id: RESPONSE.id,
            name: dataFirebase.name,
            img: dataFirebase.img,
            price: dataFirebase.price,
            stock: dataFirebase.stock,
            category: dataFirebase.category,
       };

    return data;
}