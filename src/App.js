import React, { useEffect, useState } from 'react';
import './App.css';



// react components import
import Header from "./components/Header"
import Current from "./components/Current"
import Forecast from "./components/Forecast"




// weather API key hidden in env file
const API_KEY = process.env.REACT_APP_WEATHER_KEY
const GEOCODE_KEY = process.env.REACT_APP_GEOCODE_API_KEY


// -------- 
// MAIN APP 
// --------
function App() {

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
    iconCode: 0
  })

  // weather forecast array stored here and passed to forecast component
  const [forecast, setForecast] = useState({
    forecasts: []
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

  const [units, setUnits] = useState({
    isMetric: true
  })


  // -- FUNCTIONS

  // change kph/mph if button clicked  
  function changeUnit() {
    setUnits({
      isMetric: !units.isMetric
    })
  }

  // retrieve weather data from weather api based on coordinates
  function getWeather() {
    let currentWeatherRequest = ""
    let forecastRequest = ""

    currentWeatherRequest = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;

    forecastRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`


    // NEED TO ADD REQUESTS FOR IMPERIAL UNITS

    fetch(currentWeatherRequest)
      .then(response => response.json())
      .then(current => {
        console.log(current)
        setCurrentWeather({
          // set current weather in state
          condition: current.weather[0].description,
          temp: current.main.temp,
          max: current.main.temp_max,
          min: current.main.temp_min,
          sunrise: current.sys.sunrise,
          sunset: current.sys.sunset,
          windSpeed: current.wind.speed,
          windDirection: current.wind.deg,
          cloudClover: current.clouds.all,
          iconCode: current.weather[0].id,
          humidity: current.main.humidity
        })
        setLocation({
          // set location state for header component
          name: current.name,
          country: current.sys.country,
          dateTime: current.dt
        })
      })
    fetch(forecastRequest)
      .then(response => response.json())
      .then(forecast => {
        setForecast({
          forecasts: forecast.daily.slice(1, 5)
        })
        console.log(forecast.daily.slice(1, 5))
      })

  }

  // get user coordinates from browser upon component rendering
  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    getWeather()
  }, [coords])



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

  let lastUpdate = new Date(location.dateTime) //can sub contents of brackets for epoch stamp from API
  let monthOfYear = lastUpdate.getMonth()
  let dayOfWeek = lastUpdate.getDay()
  let dayOfMonth = lastUpdate.getDate()
  let hour = lastUpdate.getHours()
  let minute = lastUpdate.getMinutes()
  let seconds = lastUpdate.getSeconds()

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  let suffix = ""
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) suffix = "st"
  else if (dayOfMonth === 2 || dayOfMonth === 22) suffix = "nd"
  else if (dayOfMonth === 3 || dayOfMonth === 23) suffix = "rd"
  else suffix = "th"



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
              icon={currentWeather.iconCode}
              changeUnit={changeUnit}
              isMetric={units.isMetric}
              humidity={currentWeather.humidity}
              dateTime={location.dateTime}


            />


          </div>
          <div className="col-12 col-md-4 mt-0 mt-md-5 forecast-cont">

            {forecast.forecasts.map((dailyForecast, index) =>
              <Forecast
                key={index}
                day={index}
                weather={dailyForecast.weather[0].description}
                icon={dailyForecast.weather[0].id}
                tempHigh={dailyForecast.temp.max}
                tempLow={dailyForecast.temp.min}
                windSpeed={dailyForecast.wind_speed}
                isMetric={units.isMetric}
              />
            )}




          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
