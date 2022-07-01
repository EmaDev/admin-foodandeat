import firebaseApp from "./config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const baseCollection = 'landigs_products/FoodAndEatDB/products_collection';

export const getExtrasPrice = async () => {
    try {
        const docRef = doc(db, "landigs_products", "FoodAndEatDB");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return (docSnap.data().extras);
        } else {
            console.log("No such document!");
            return null;
        }

    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (data: {}, id: string) => {

    try {
        const docRef = doc(db, baseCollection, id);
        await updateDoc(docRef, {
            ...data
        });
        return { ok: true, msg: 'Product updated successfuly' };
    } catch (error: any) {
        return { ok: false, msg: error.message }
    }
};

export const getAllProducts = async () => {

    const q = query(collection(db, baseCollection));
    const querySnapshot = await getDocs(q);
    const arrProducts: any[] = [];
    querySnapshot.forEach((doc) => {
        arrProducts.push({...doc.data(), id: doc.id});
    });
    return arrProducts;
};

export const createNewProduct = async(data:{}) => {

    try {
        await addDoc(collection(db, baseCollection), {
            ...data
        });
        return {ok:true, msg: `Created successfuly`};
    } catch (error:any) {
        return {ok:false, msg: error.message};
    }
    
}

export const deleteProdById = async(id:string) => {
    try {
        await deleteDoc(doc(db, baseCollection, id));
        return {ok:true, msg: 'Delete successfuly'};
    } catch (error:any) {
        return {ok:true, msg: error.message};
    }
}