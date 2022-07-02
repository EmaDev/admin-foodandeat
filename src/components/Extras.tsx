import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getExtrasPrice, setExtrasPrice } from '../firebase/queriesDataBase';
import { Button } from './Button';

const Container = styled.section`
   margin: auto;
   max-width: 600px;
`;
const ContainerInputs = styled.div`
   padding: 15px;
   background-color: rgb(22,22,22);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items:center;
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
    color:white;
    font-size: 18px;
   }

`;

interface Form {
    chedar: string;
    carne: string;
}
export const Extras = () => {

    const [formValues, setFormValues] = useState<Form>({ chedar: '', carne: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const { chedar, carne } = formValues;

    useEffect(() => {
        getPrices();
    },[]);
    const getPrices = async () => {
        const resp = await getExtrasPrice();
        setFormValues(resp);
        setLoading(false);
    }

    const saveDataInDB = async() => {
        const resp = await setExtrasPrice({
            chedar: parseInt(chedar),
            carne: parseInt(carne)
        });
        if(resp.ok){
            alert('Guardado correctamente');
        }
    }

    const handleChange = ({ target }: any) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    return (
        <Container>
            <h2>Extras</h2>
            {
                (loading) ? <h2>Cargando...</h2>
                    :
                    <ContainerInputs>
                        <div>
                            <label>Chedar: $</label>
                            <input
                                value={chedar}
                                name="chedar"
                                onChange={handleChange} />
                        </div>
                        <div>
                            <label>Carne: $</label>
                            <input
                                value={carne}
                                name="carne"
                                onChange={handleChange} />
                        </div>
                        <br/>
                        <Button color='#255A26'text='Guardar Cambios' onClick={saveDataInDB}/>
                    </ContainerInputs>
            }
        </Container>
    )
}
