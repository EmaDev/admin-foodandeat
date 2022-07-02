import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllProducts } from '../firebase/queriesDataBase';
import { Button } from './Button';
import { ProductCard } from './ProductCard';

const Container = styled.section`
   margin: auto;
   max-width: 600px;
`;

const Line = styled.div`
   height: 1px;
   width: 95%;
   background-color: white;
   margin: 20px auto;
`;

interface Props {
    openModal: () => void;
    setDataModal: (data: Product) => void;
    setChangeInProds: ()=>void;
    anyChanges:number;
}
export interface Product {
    id: string;
    img: string;
    ingredients: string;
    name: string;
    price: number;
}
export const Products = ({ openModal, setDataModal, anyChanges, setChangeInProds }: Props) => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, [anyChanges]);

    const getProducts = async () => {
        const resp = await getAllProducts();
        setProducts(resp)
    }

    if (products.length === 0) {
        return <h2>Cargando...</h2>
    }
    return (
        <Container>
            <h2>Productos</h2>
            <Button onClick={openModal} color='#315BBE' text='Crear nuevo producto' />
            <Line />

            {
                products.map(prod => (
                    <ProductCard key={prod.id} prod={prod} 
                    setModalData={setDataModal} 
                    setChangeInProds={setChangeInProds}
                    />
                ))
            }
        </Container>
    )
}
