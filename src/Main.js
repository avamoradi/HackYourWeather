import React, {useState, useEffect} from 'react';
import CityList from './cityList';
import FormSearch from './FormSearch';
import Error from './Error';
import Context from './context';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const Main = () => {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cities') || "[]");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [cityList, setCityList] = useState(cartFromLocalStorage);

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
        findCity = cityList.find((item) => {
          if (item.id === data.id) {
           return true;
          } else {
            return false;
          }
        });
        if (!findCity) {
          setCityList([...cityList, data]);
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
    localStorage.setItem('cities',JSON.stringify(cityList))
  },[cityList]);

  const handleDelete = (id) => {
    const newCityList = cityList.filter((item) => item.id !== id);
    setCityList(newCityList)
  }
  return (
    <Context.Provider value = {{fetchApi, error, loading, setLoading, handleDelete, cityList, setCityList}}>
    <FormSearch />
    {error && <Error/>}
    <CityList/>
    </Context.Provider> 
  )
}

export default Main;


  



