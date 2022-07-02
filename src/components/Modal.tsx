import { useEffect, useState } from 'react';
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
    min-height: 100px;
    margin: auto;
    border-radius: 6px;
   }   
   span{
    font-size: 12px;
    font-weight: 400;
    margin: 0 10px;
    color: #f15959;
   }
`;

const Image = styled.img`
   margin: -10px 10px;
   width: 100px;
   height: 100px;
`;

interface Props {
    dataProduct: Product;
    closeModal: () => void;
    setChangeInProds: () => void;
}
interface ImageFile {
    path: string;
    file: any;
    fakeUrl: any;
}

export const Modal = ({ closeModal, dataProduct, setChangeInProds }: Props) => {

    const { setAllValues, values, handleInputChange } = useForm({ name: '', id: '', img: '', ingredients: '', price: '' });
    const [imageState, setImageState] = useState<ImageFile | any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { name, ingredients, price, id } = values;

    useEffect(() => {
        if (dataProduct.id !== '') {
            setAllValues(dataProduct);
            setImageState({
                path: '',
                file: null,
                fakeUrl: dataProduct.img
            });
        }
    }, []);

    const handleImageChange = ({ target }: any) => {
        setImageState({
            path: target.files[0].name,
            file: target.files[0],
            fakeUrl: URL.createObjectURL(target.files[0])
        });
    }


    const handleSaveChanges = async () => {

        if (name.trim() === '' || ingredients.trim() === '', price.toString().trim() === '') {
            return alert('Comlpleta los campos obligatorios');
        }
        setIsLoading(true);
        if (id === '') {
            const resp = await createNewProduct({
                name,
                ingredients,
                price: parseInt(price.toString())
            }, imageState);

            if (resp.ok) {
                alert('Creado Correctamente');
            } else {
                alert(`Error: ${resp.msg}`);
            }
        } else {
            const resp = await updateProduct({
                name,
                ingredients,
                price: parseInt(price.toString())
            }, id, imageState);

            if (resp.ok) {
                alert('Modificado Correctamente');
            } else {
                alert(`Error: ${resp.msg}`);
            }
        }
        setIsLoading(false);
        closeModal();
        setChangeInProds();
    }
    return (
        <Container>
            <ModalDiv>
                <h3>{(id === '') ? 'Nuevo Producto' : `ID: ${id}`}</h3>
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
                    <label>Imagen:<span>{` (350px X 350px en PNG)`}</span></label>
                    <input type={'file'} onChange={handleImageChange} />
                </Input>
                {
                    (imageState) &&
                    <Image src={imageState.fakeUrl} />
                }
                {(isLoading) ? <h3>Espera unos segundos..</h3>
                    :
                    <ContainerButtons>
                        <Button onClick={handleSaveChanges} color='#255A26' text='Guardar' />
                        <Button onClick={closeModal} color='#BF3737' text='Cancelar' />
                    </ContainerButtons>
                }
            </ModalDiv>
        </Container>
    )
}
