import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getContactPhone, setContactPhonne } from '../firebase/queriesDataBase';
import { Button } from './Button';

const Container = styled.section`
   margin: auto;
   max-width: 600px;
`;
const InputData = styled.div`
  padding: 10px;
  border-radius: 6px;

  label{
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
   }
   input{
    background-color: rgb(22,22,22);
    padding: 10px;
    border-style:none;
    border-bottom: .5px solid white;
    color: white;
    font-size: 18px;
   }
`;
export const Contact = () => {

    const [phone, setPhone] = useState<string>('');
    const [isLoading, setIsLoding] = useState<boolean>(true);
    useEffect(() => {
        getTelefono();
    }, []);

    const getTelefono = async () => {
        const resp = await getContactPhone();
        setPhone(resp);
        setIsLoding(false);
    }
    const handleChange = ({ target }: any) => {
        setPhone(target.value);
    }
    const saveDataInDB = async() => {
        const resp = await setContactPhonne(phone);
        if(resp.ok){
            alert('Guardado correctamente');
        }
    }

    return (
        <Container>
            <h2>Contacto</h2>
            {
                (isLoading) ? <h2>Cargando...</h2>
                    :
                    <>
                        <InputData>
                            <label>Tel. </label>
                            <input
                                type={'number'}
                                value={phone}
                                name="phone"
                                onChange={handleChange}
                            />
                        </InputData>
                        <br/>
                        <Button color='#255A26' text='Guardar Cambios' onClick={saveDataInDB} />
                    </>
            }
        </Container>
    )
}
