import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import sunny_icon from '../assets/sunny.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef() // useRef for the input field reference

  const [waetherData, setWeatherData] = useState(false); // State to store weather data

  const allIcons = {
    // Weather icon mapping based on the API response
    "01d" : cloud_icon,
    "01n" : cloud_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  }

  // Function to search and fetch weather data
  const search = async (city) => {
    if(city === ""){ 
      alert("Enter City Name"); // Alert if input is empty
      return;
    }
    try {
      const keyAPI = "ed0e25bc9def0c54bc7f36037f09b8ee"; // API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyAPI}`;

      const response = await fetch(url); // Fetch data from API
      const data = await response.json(); // Parse the data

      if (!response.ok) {
        alert(data.message); // Show error message from API if failed
        return;
      }

      const icon = allIcons[data.weather[0].icon] || sunny_icon; // Get the corresponding weather icon

      // Update the state with fetched weather data
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
      
    } catch (error) {
      setWeatherData(false); // Reset weather data on error
      console.error("Error in Fetching Weather Data");
    }
  }

  // Initial effect to load weather data for "Colombo"
  useEffect (() => {
    search("Colombo");
  },[]);

  return (
    <div className='weather'>
      {/* Search bar start */}
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search'/> {/* Input field */}
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/> {/* Search button */}
      </div>
      {/* Search bar end */}

      {/* Display weather data if available */}
      {waetherData ? <>
        <img src={waetherData.icon} alt="" className='weather-icon'/> {/* Weather icon */}
        <p className='tempo'>{waetherData.temperature}°C</p> {/* Temperature */}
        <p className='location'>{waetherData.location}</p> {/* Location */}
        
        {/* Display additional weather details */}
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" id='humidityimgicon'/> {/* Humidity icon */}
            <div>
              <p>{waetherData.humidity}%</p> {/* Humidity value */}
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" id='windimgicon'/> {/* Wind speed icon */}
            <div>
              <p>{waetherData.windSpeed} KM/h</p> {/* Wind speed value */}
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </> : <></>}   
    </div>
  )
}

export default Weather
