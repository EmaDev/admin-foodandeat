import { useState } from "react";
import { Product } from "../components/Products";

export const useForm = ( initialState:any = {} ) => {
    
    const [values, setValues] = useState<Product>(initialState);

    const reset = () => {
        setValues( initialState );
    }
    
    const handleInputChange = ({ target }:any) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    const setAllValues = (values:Product) => {
        setValues(values);
    }

    
    return {values, handleInputChange, reset, setAllValues };
}