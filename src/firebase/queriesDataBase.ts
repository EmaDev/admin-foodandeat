import firebaseApp from "./config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import {ref,uploadBytes,getDownloadURL, getStorage} from 'firebase/storage';

const db = getFirestore(firebaseApp);
const cloudStorage = getStorage();
const baseCollection = 'landigs_products/FoodAndEatDB/products_collection';

export const updateProduct = async (data: {}, id: string,archive: {path: string, file: any, fakeUrl:any}) => {

    try {
        const docRef = doc(db, baseCollection, id);
        await updateDoc(docRef, {
            ...data
        });

        if(archive.path !== '') {
            const resp = await uploadFile(archive);
            await updateDoc(docRef, {img:resp})
        }
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
        arrProducts.push({ ...doc.data(), id: doc.id });
    });
    return arrProducts;
};

export const createNewProduct = async (data: {}, archive: {path: string, file: any, fakeUrl:any}) => {

    try {
        const docRef = await addDoc(collection(db, baseCollection), {
            ...data
        });
        if(archive.path !== '') {
            const resp = await uploadFile(archive);
            await updateDoc(docRef, {img:resp})
        }
        return { ok: true, msg: `Created successfuly` };
    } catch (error: any) {
        return { ok: false, msg: error.message };
    }
};

export const deleteProdById = async (id: string) => {
    try {
        await deleteDoc(doc(db, baseCollection, id));
        return { ok: true, msg: 'Delete successfuly' };
    } catch (error: any) {
        return { ok: true, msg: error.message };
    }
};

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

export const getContactPhone = async () => {
    try {
        const docRef = doc(db, "landigs_products", "FoodAndEatDB");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return (docSnap.data().telefono);
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};
export const setExtrasPrice = async (extras: { chedar: any; carne: any }) => {
    try {
        const docRef = doc(db, "landigs_products", "FoodAndEatDB");
        const prevDoc = await getDoc(docRef);
        console.log(prevDoc.data());
        await updateDoc(docRef, {
            ...prevDoc.data(),
            extras
        });
        return { ok: true, msg: 'Update succesfully' };
    } catch (error: any) {
        return { ok: false, msg: error.message };
    }
};

export const setContactPhonne = async (phone: string) => {
    try {
        const docRef = doc(db, "landigs_products", "FoodAndEatDB");
        const prevDoc = await getDoc(docRef);
        console.log(prevDoc.data());
        await updateDoc(docRef, {
            ...prevDoc.data(),
            telefono: phone
        });
        return { ok: true, msg: 'Update succesfully' };
    } catch (error: any) {
        return { ok: false, msg: error.message };
    }
};

const uploadFile = async (archive:any) => {
    const fileRef = ref(cloudStorage,  `/foodAndEat/${archive.path}`);
    await uploadBytes(fileRef, archive.file);

    return await getDownloadURL(fileRef);
}
