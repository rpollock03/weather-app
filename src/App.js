import React, { useEffect, useState } from 'react';
import './App.css';



// react components import
import Header from "./components/Header"
import Current from "./components/Current"
import Forecast from "./components/Forecast"
import LeafletMap from "./components/LeafletMap"



// weather API key hidden in env file
const API_KEY = process.env.REACT_APP_WEATHER_KEY


// -------- 
// MAIN APP 
// --------
function App() {

  // -- FUNCTIONS

  // state for current weather, passed to Current Weather component
  const [currentWeather, setCurrentWeather] = useState({
    condition: "none",
    temp: 0,
  })

  // state for location data, passed to Header component 
  const [location, setLocation] = useState({
    name: "",
    country: "",
  })

  const [locationMode, setLocationMode] = useState(false)

  // state for coordinates, used by findweather function
  const [coords, setCoords] = useState({
    latitude: 0.0,
    longitude: 0.0
  })

  // weather forecast array stored here and passed to forecast component
  const [forecast, setForecast] = useState({
    forecast: []
  })

  //state to keep track of units of measurement
  const [tempUnit, setTempUnit] = useState({
    isCelsius: true
  })

  const [units, setUnits] = useState({
    isMetric: true
  })

  //object for googlemaps

  const googleCoords = {
    lat: coords.latitude,
    lng: coords.longitude
  }


  // change C/F if button clicked
  function changeTempUnit() {
    setTempUnit({
      isCelsius: !tempUnit.isCelsius
    }
    )
    console.log(tempUnit.isCelsius)
  }

  // change kph/mph if button clicked  
  function changeUnit() {
    setUnits({
      isMetric: !units.isMetric
    })
    console.log(units.isMetric)
  }

  // retrieve weather data from weather api based on coordinates
  function getWeather() {
    let currentWeatherRequest = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;

    let forecastRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`

    // NEED TO ADD REQUESTS FOR IMPERIAL UNITS

    fetch(currentWeatherRequest)
      .then(response => response.json())
      .then(current => {
        setCurrentWeather({
          // set current weather in state
          condition: current.weather[0].description,

        })
        setLocation({
          // set location state for header component
          name: current.name,
          country: current.sys.country
        })
      })
  }

  // get user coordinates from browser upon component rendering
  useEffect(() => {
    getLocation()
  }, [])

  function newLocation() {
    setLocationMode(true)
  }

  // whenever coordinates are updated, refresh weather forecast
  useEffect(() => {
    getWeather()
  }, [coords])

  // function to determine user coordinates from browser
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert("geolocation not supported by browser! Please enter a location")
    }
  }

  // callback function from getLocation - adds coordinates to location state
  function showPosition(position) {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  return (
    <div className="container">
      <div className="my-5">

        {/*HEAD OF APP*/}

        <Header
          locationName={location.name}
          locationCountry={location.country}
          updateLocation={getLocation}
          changeLocation={newLocation}
        />

        {/*BODY OF APP*/}

        <div className="row container">
          <div className="col-md-8 current-cont">
            <Current condition={currentWeather.condition} />
          </div>
          <div className="col-8 col-md-4 mt-0 mt-md-5 forecast-cont">
            <p><i class="fas fa-sync-alt"></i> Last Updated: 10 seconds ago</p>
            <Forecast />
            <Forecast />
            <Forecast />
            <Forecast />
            <Forecast />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
