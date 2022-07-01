import { useEffect } from 'react';
import styled from 'styled-components';
import { createNewProduct, updateProduct } from '../firebase/queriesDataBase';
import { useForm } from '../hooks/useForm';
import { Button, ContainerButtons } from './Button';
import { Product } from './Products';

const Container = styled.div`
   margin: 0 auto; 
   width: 100%;
   min-height: 100vh;
   background-color: rgba(0,0,0,0.8);
   position: fixed;
`;
const ModalDiv = styled.form`
   margin:auto; 
   padding: 5px 10px 25px 10px;
   width: 90%;
   max-width:700px;
   background-color: #232323;
   color: #EEEEEE;
   border-radius: 6px;
`;
const Input = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   label{
    font-weight: bold;
    font-size: 18px;
    margin: 10px;
   }
   input{
    width: 90%;
    margin: auto;
    padding: 10px;
    border-radius: 6px;
   }
   textarea{
    width: 90%;
    min-height: 200px;
    margin: auto;
    border-radius: 6px;
   }   
`;

interface Props {
    dataProduct: Product;
    closeModal: () => void;
    setChangeInProds: () => void;
}

export const Modal = ({ closeModal, dataProduct,setChangeInProds }: Props) => {

    const { setAllValues, values, handleInputChange } = useForm({ name: '', id: '', img: '', ingredients: '', price: '' });
    const { name, img, ingredients, price, id } = values;

    useEffect(() => {
        setAllValues(dataProduct);
    }, []);

    const handleSaveChanges = async () => {

        if (id === '') {
            const resp = await createNewProduct({
                name,
                ingredients,
                price
            });
            if (resp.ok) {
                alert('Creado Correctamente');
            } else {
                alert(`Error: ${resp.msg}`);
            }
        } else {
            const resp = await updateProduct({
                name,
                ingredients,
                price
            }, id);

            if (resp.ok) {
                alert('Modificado Correctamente');
            } else {
                alert(`Error: ${resp.msg}`);
            }
        }
        closeModal();
        setChangeInProds();
    }
    return (
        <Container>
            <ModalDiv>
                <h2>{(id==='') ? 'Nuevo Producto': `Prod: ${id}`}</h2>
                <Input>
                    <label>Nombre:</label>
                    <input type={'text'}
                        value={name}
                        name="name"
                        onChange={handleInputChange}
                        placeholder="Escribe un nombre" />
                </Input>
                <Input>
                    <label>Precio:</label>
                    <input type={'number'}
                        value={price}
                        name="price"
                        onChange={handleInputChange}
                        placeholder="Escribe un precio" />
                </Input>
                <Input>
                    <label>Descripcion:</label>
                    <textarea
                        name="ingredients"
                        onChange={handleInputChange}
                        value={ingredients}
                    />
                </Input>
                <Input>
                    <label>Imagen:</label>
                    <input type={'file'} />
                </Input>
                <ContainerButtons>
                    <Button onClick={handleSaveChanges} color='green' text='Guardar' />
                    <Button onClick={closeModal} color='red' text='Cancelar' />
                </ContainerButtons>
            </ModalDiv>
        </Container>
    )
}
