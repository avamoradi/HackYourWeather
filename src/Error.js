import React,{useContext} from 'react';
import styled from 'styled-components';
import Context from './context';


const PError = styled.p`
color: #851712;
font-weight :bold;
`;

const Error = () => {
  const {error} = useContext(Context);
  return (
    <div>
      <PError>{error}</PError>
    </div>
  )
}

export default Error
