
import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'

function App() {

const[input,setInput]=useState("")
const[weather,setWeather]=useState({
  loading:false,
  data:{},
  error:false
})

const toDate = () => {
  const months = [
    "January","February", "March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const currentDate = new Date();
  const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  return date;
}

const search = (event) =>{
  if(event.key === "Enter"){
    setInput('')
    setWeather({...weather, loading:true})
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params:{
        q:input,
        units:"metric",
        appid:"f00c38e0279b7bc85480c3fe775d518c"
      }
    }).then(res =>{
      console.log(res)
      setWeather({data: res.data, loading:false, error:false})
    }).catch(err=>{
      setWeather({...weather, data:{},error:true})
    })
  }
}

  return (
   <div className='app'>
    <div className='weather-app'>
      <div className='city-search-bar'>
        <input type="text"  className='city' placeholder='Enter City Name...' value={input} onChange={(e)=>setInput(e.target.value)} 
        onKeyDown={search}/>
      </div>
      {
        weather.loading && (
          <Oval type="Oval" color='greeen' height={70} width={70}></Oval>
        )
      }
      {
        weather.error && (
          <div className='err-message'>
            <span>City Not Found</span>
          </div>
        )
      }
      {
        weather &&weather.data && weather.data.main &&(
          <div>
            <div className='city-name'>
              <h2>{weather.data.name},
              <span>
                {weather.data.sys.country}
              </span>
              </h2>
            </div>
            <div className='date'>
              <span>{toDate()}</span>
            </div>
            <div className='icon-temp'>
              <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
              {Math.round(weather.data.main.temp)}
              <sup className='deg'>°C</sup>
            </div>
            <div className='des-wind'>
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed:{weather.data.wind.speed}</p>
            </div>
          </div>
        )
      }
    </div>
   </div>
  )
}

export default App
