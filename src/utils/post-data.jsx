import { getFirestore } from "../firebase/client";

export const addOrder = async (order) => {
    const DB = getFirestore();
    const RESPONSE = await DB.collection("orders").add(order);
    const { id } = RESPONSE;
    
    return id;
}