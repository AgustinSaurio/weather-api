import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faCloudRain } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './App.css'
import Graphics from './helpers/GraphicsF'
import ForecastDays from './helpers/ForecastDays'

function GetWeather() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [dataF, setForecast] = useState({});

  const url = `http://api.weatherapi.com/v1/current.json?key=69da2acdc45041aa8a7213352222406&q=${location}&aqi=no`;
  const urlF = `http://api.weatherapi.com/v1/forecast.json?key=69da2acdc45041aa8a7213352222406&q=${location}&days=7&aqi=no&alerts=yes`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
      })
      axios.get(urlF).then((res) => {
        setForecast(res.data);
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search-container">
        <input
          className='search'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {data.current && data.location && dataF.forecast ? 
      <div className="container">
        <div className='datas'>
          <div className='icon-location'>
            <div className='country'>
              <h1>{data.location.region}</h1>
            </div>
            <p>{data.location.name}, {data.location.country}</p>
          </div>
          <div className='temp-graphic'>
            <div className='data-temp'>
              <div className='data-temp-text'>
                <h1><b>{data.current.temp_c.toFixed()}</b>°C</h1>
                <span>Hum: <b>{data.current.humidity.toFixed()}%</b></span>
                <span>Cloud: <b>{data.current.cloud.toFixed()}%</b></span>
              </div>
              <img src={data.current.condition.icon} alt="clima" />
            </div>
            <div className='data-text'>
              <div className='wind-rain'>
                <FontAwesomeIcon icon={faWind} size="2x"/>
                <span>Wind: <b>{data.current.wind_kph.toFixed()}km/h</b></span>
              </div>
              <div className='wind-rain'>
                <FontAwesomeIcon icon={faCloudRain} size="2x" />
                <span>Precip: <b>{data.current.precip_in.toFixed()}%</b></span>
              </div>
            </div>
            <div className='forecast-days'>
              {dataF.forecast.forecastday ? <ForecastDays dataF={dataF} /> : null}
            </div>
            <div className='graphic-box'>
              <div className='graphic'>
                {dataF.forecast.forecastday ? <Graphics dataF={dataF}/> : null}
              </div>
            </div>
          </div>
        </div>
      </div> : <div className='write-location'><h1>Write your location</h1></div>}
    </div>
  );
}

export default GetWeather;