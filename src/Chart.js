import React,{useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer} from "recharts";
import styled from 'styled-components';
import Button from './Styles/ButtonStyle';

const DivChart = styled.div`
display : "flex";
justify-content: space-around;
align-items: center;
width : 100%;,
`;

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

const Chart = () => {
  const [cityDetail, setCityDetail] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {cityId} = useParams();
  const ID = parseInt(cityId, 10);

  useEffect(() => {
   getData();
  },[]);

  async function getData(){
    try {
      setLoading(true)
      let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${ID}&appid=${API_KEY}&units=metric`);
      let data = await response.json();
      setCityDetail(data.list);
      return data;
    }
    catch{
      setError("API ERROR");
      return 0;
    }
    finally{
     setLoading(false);
    }
  }

  return (
    <div>
      {error ? <p>{error}</p> : 
      <DrawChart cityDetail={cityDetail} loading={loading}/>
      }
      <Button>
        <Link style = {{color:'#433427', textDecoration: 'none'}} to = "/">
          Back to Homepage
        </Link>
      </Button>
    </div>
  )
}

function DrawChart({cityDetail, loading}){
  return (
    <DivChart>
    {loading && <p> is loading...</p>}
    <h1>5 days forecast</h1>
     <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={cityDetail} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
       <defs>
         <linearGradient id="colorTempMax" x1="0" y1="0" x2="0" y2="1">
           <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
           <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTempMin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1976D2" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#1976D2" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="dt_txt" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="main.temp_min" stroke="#8884d8" fillOpacity={1} fill="url(#colorTempMin)" />
        <Area type="monotone" dataKey="main.temp_max" stroke="#8884d8" fillOpacity={1} fill="url(#colorTempMax)" />
      </AreaChart>
     </ResponsiveContainer>
    </DivChart>
 )
}

export default Chart;