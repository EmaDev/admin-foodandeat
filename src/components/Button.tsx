import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  padding: 8px;
  background-color: ${({color}) => color};
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  width: 100%;
  margin: auto 5px;
  text-transform: uppercase;
`;

export const ContainerButtons = styled.div`
   display: flex;
   margin: 30px auto 5px auto;
   justify-content: space-around;
`;

interface Props {
    text: string;
    color: string;
    onClick: any;
}

export const Button = ({text, color, onClick}:Props) => {
  return (
    <Btn type={'button'} color={color} 
        onClick={onClick}>
        {text}
    </Btn>
  )
}
