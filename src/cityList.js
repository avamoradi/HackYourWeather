import React,{useContext} from 'react';
import CardStyle from './Styles/CardStyle';
import DeleteButton from './Styles/DeleteButton';
import styled from 'styled-components';
import H1 from './Styles/Header';
import Context from './context';
import {Link} from 'react-router-dom';

const Div = styled.div`
margin-top:10px;
font-size:1.5rem;
`;

const Image = styled.img`
background-color:#bdbab8;
border-radius:50%;`;

const CityList = () => {
  const {cityList} = useContext(Context);
  const {loading} = useContext(Context);
  const {handleDelete} = useContext(Context);

  return(
    <>
      {Object.keys(cityList).length > 0 && cityList.map((city) => (
       <RenderCard city={city} />
      ))}
    </>
  )

  function RenderCard({city}) {
    const {name,sys, weather, main, coord, id} = city;
    return (
      <CardStyle>
        {loading && <p> is loading...</p>}
        <div> 
          <DeleteButton onClick = {() => handleDelete(id)}>X</DeleteButton>
          <H1><Link to={`/${id}`} style = {{color:'#433427'}}>{name} {sys.country}</Link></H1>
        </div>
        <Div>
          <Image src = {`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt='weatherIcon'/>
          <h3>{weather[0].main}</h3>
          <h5>{weather[0].description}</h5>
        </Div>
        <Div>
          <span>min temp:</span>
          <span>{main.temp_min}</span>
        </Div>
        <Div>
          <span>max temp:</span>
          <label>{main.temp_max}</label>
        </Div>
        <Div>
          <span>location:</span>
          <span>{coord.lat},{coord.lon}</span> 
        </Div>
      </CardStyle>
    )
  }
}

export default CityList
