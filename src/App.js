import React, { useEffect, useState } from 'react';
import './App.css';



// react components import
import Header from "./components/Header"
import Current from "./components/Current"
import Forecast from "./components/Forecast"
import LeafletMap from "./components/LeafletMap"



// weather API key hidden in env file
const API_KEY = process.env.REACT_APP_WEATHER_KEY
const GEOCODE_KEY = process.env.REACT_APP_GEOCODE_API_KEY


// -------- 
// MAIN APP 
// --------
function App() {

  // -- FUNCTIONS

  // state for current weather, passed to Current Weather component
  const [currentWeather, setCurrentWeather] = useState({
    condition: "none",
    temp: 0,
    max: 0,
    min: 0,
    sunrise: 0,
    sunset: 0,
    windSpeed: 0,
    windDirect: 0,
    cloudCover: 0,
    iconCode: 0
  })



  // state for location data, passed to Header component 
  const [location, setLocation] = useState({
    name: "",
    country: "",
    dateTime: 0
  })

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
  function getWeather(searchTerm) {
    let currentWeatherRequest = ""

    //if there is a search term 
    if (searchTerm) {
      currentWeatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`

    } else {
      // api based on coordinates
      currentWeatherRequest = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
      console.log("there is no search term!")
    }

    let forecastRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`

    // NEED TO ADD REQUESTS FOR IMPERIAL UNITS

    fetch(currentWeatherRequest)
      .then(response => response.json())
      .then(current => {
        setCurrentWeather({
          // set current weather in state
          condition: current.weather[0].description,
          temp: current.main.temp,
          max: current.main.temp_max,
          min: current.main.temp_min,
          sunrise: current.sys.sunris,
          sunset: current.sys.sunset,
          windSpeed: current.wind.speed,
          windDirection: current.wind.deg,
          cloudClover: current.clouds.all,
          iconCode: current.weather[0].id
        })
        setLocation({
          // set location state for header component
          name: current.name,
          country: current.sys.country,
          dateTime: current.dt
        })
      })
  }

  // get user coordinates from browser upon component rendering
  useEffect(() => {
    getLocation()
  }, [])

  //update coordinates based on search term
  function updateCoords(searchTerm) {
    fetch(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_KEY}&q=${searchTerm}&limit=1&format=json`)
      .then(response => response.json())
      .then(newLocation => {
        if (newLocation.error) {
          alert("Can't find location!")
          return;
        } else {
          setCoords({
            latitude: newLocation[0].lat,
            longitude: newLocation[0].lon
          }, getWeather(searchTerm))

        }
      })

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
          updateCoords={updateCoords}

        />

        {/*BODY OF APP*/}

        <div className="row container">
          <div className="col-md-8 current-cont">
            <Current
              condition={currentWeather.condition}
              temp={currentWeather.temp}
              max={currentWeather.max}
              min={currentWeather.min}
              sunrise={currentWeather.sunrise}
              sunset={currentWeather.sunset}
              windSpeed={currentWeather.windSpeed}
              windDirection={currentWeather.windDirection}
              cloudCover={currentWeather.cloudCover}
              lat={coords.latitude}
              lon={coords.longitude}
            />


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
