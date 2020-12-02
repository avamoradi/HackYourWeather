import React,{useState, useContext} from 'react';
import Button from './Styles/ButtonStyle';
import Input from './Styles/Inputstyle';
import Context from './Context';


const FormSearch = () => {
  const {fetchApi} = useContext(Context);
  const[inputValue , setInputValue] = useState('');
  return (
     <>
   <Input type = "text" placeholder = "Serach city" name="location" onChange = {(e) => setInputValue(e.target.value) } ></Input>
   <Button onClick={() => inputValue.length >= 1 ? fetchApi(inputValue) :<></>}>Search </Button>
   </>
  )
}

export default FormSearch;