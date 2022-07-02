import styled from 'styled-components';
import { deleteProdById } from '../firebase/queriesDataBase';
import { Button, ContainerButtons } from './Button';
import { Product } from './Products';

const Container = styled.div`
   padding: 10px;
   border-bottom: 1px solid white; 
   border-radius: 3px;
   background-color:  rgb(22, 22, 22);
`;

const ItemAtribute = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  label{
    font-size: 16px;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  p{
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
`;
const ImagenMuestra = styled.img`
  width: 90px;
  heigth: 90px;
  margin: 0 20px;
`;

interface Props{
    setModalData: (data:Product) => void;
    setChangeInProds: () =>void;
    prod: Product;
}
export const ProductCard = ({setModalData, setChangeInProds,prod}:Props) => {

    const {id,img,ingredients,name,price} = prod;

    const setData = () => {
        setModalData(prod);
    }

    const handleDeleteProd = async() => {
        const resp =  await deleteProdById(id);
        if(resp.ok){
          alert('Elminado correctamente');  
          setChangeInProds();   
        }else{
          alert(`Error: ${resp.msg}`);
        }
    }
    return (
        <Container>
            <ItemAtribute>
                <label>Nombre:</label>
                <p>{name}</p>
            </ItemAtribute>
            <ItemAtribute>
                <label>Precio:</label>
                <p>{`$ ${price}`}</p>
            </ItemAtribute>
            <ItemAtribute>
                <label>Descripcion:</label>
                <span>{ingredients}</span>
            </ItemAtribute>
            <ItemAtribute>
                <label>Imagen:</label>
                <ImagenMuestra src={img}/>
            </ItemAtribute>
            <ContainerButtons>
                <Button onClick={setData} color='#315BBE' text='modificar' />
                <Button onClick={handleDeleteProd} color='#BF3737' text='eliminar' />
            </ContainerButtons>
        </Container>
    )
}
