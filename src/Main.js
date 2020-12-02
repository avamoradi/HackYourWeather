import React, {useState, useEffect} from 'react';
import CityList from './CityList';
import FormSearch from './FormSearch';
import Error from './Error';
import Context from './Context';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const Main = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cities') || "[]");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [cityArray, setCityArray] = useState(cartFromLocalStorage);

  async function fetchApi (inputValue){
    try{
      setError(false);
      if (!inputValue) {
        return  setError('Please Enter the name of city.')
      }
      setLoading(true);
      let response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric`);
      let data = await response.json();
      if (data.cod === "404"){
       setError("There is an Error")
      } else {
        let findCity = false;
        findCity = cityArray.find((item) => {
          if (item.id === data.id) {
           return true;
          } else {
            return false;
          }
        });
        if (!findCity) {
          setCityArray([...cityArray, data]);
        }
      }
    }
    catch{ 
      setError("API ERROR")
      return 0
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('cities',JSON.stringify(cityArray))
  },[cityArray]);

  const handleDelete = (id) => {
    const newCityList = cityArray.filter((item) => item.id !== id);
    setCityArray(newCityList)
  }
  return (
    <Context.Provider value = {{fetchApi, error, loading, setLoading, handleDelete, cityArray, setCityArray}}>
    <FormSearch />
    {error && <Error/>}
    <CityList/>
    </Context.Provider> 
  )
}

export default Main;


  



