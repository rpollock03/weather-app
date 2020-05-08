import React, { useEffect, useState } from 'react';
import './App.css';
import CurrentWeather from "./CurrentWeather"
import ForecastWeather from "./ForecastWeather"
import Header from "./Header"

// weather API key hidden in env file
const API_KEY = process.env.REACT_APP_WEATHER_KEY

function App() {

  // state for current weather, passed to Current Weather component
  const [weather, setWeather] = useState({
    condition: "none",
    tempf: 0,
    tempc: 0,
    icon: "",
    wind_dir: "",
    wind_mph: 0,
    wind_kph: 0,
    cloud: 0,
  })

  // state for location data, passed to Header component 
  const [location, setLocation] = useState({
    name: "",
    region: "",
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
  function getWeather() {
    let request = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${coords.latitude},${coords.longitude}&days=5`
    fetch(request)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setWeather({
          // set current weather in state
          condition: data.current.condition.text,
          tempc: data.current.temp_c,
          tempf: data.current.temp_f,
          icon: data.current.condition.icon,
          wind_dir: data.current.wind_dir,
          wind_mph: data.current.wind_mph,
          wind_kph: data.current.wind_kph,
          cloud: data.current.cloud,
        })
        setLocation({
          // set location state for header component
          name: data.location.name,
          region: data.location.region,
          localTime: data.location.localtime_epoch
        })
        setForecast({
          // add weather forecast to state
          forecast: data.forecast.forecastday
        })
      })
  }

  // get user coordinates from browser upon component rendering
  useEffect(() => {
    getLocation()
  }, [])

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
    <div className="App col-12">
      <Header
        locationName={location.name}
        locationRegion={location.region}
        updateLocation={getLocation}
      />
      <CurrentWeather
        condition={weather.condition}
        tempc={weather.tempc}
        tempf={weather.tempf}
        icon={weather.icon}
        windDir={weather.wind_dir}
        windMph={weather.wind_mph}
        windKph={weather.wind_kph}
        cloud={weather.cloud}
        isCelsius={tempUnit.isCelsius}
        isMetric={units.isMetric}
        changeTempUnit={changeTempUnit}
        changeUnit={changeUnit}
      />
      <hr />
      <div className="forecast-container">
        {forecast.forecast.map((dailyForecast, index) => (
          <ForecastWeather
            key={index}
            day={index}
            condition={dailyForecast.day.condition.text}
            windKph={dailyForecast.day.maxwind_kph}
            windMph={dailyForecast.day.maxwind_mph}
            sunrise={dailyForecast.astro.sunrise}
            sunset={dailyForecast.astro.sunset}
            maxTempF={dailyForecast.day.maxtemp_f}
            minTempF={dailyForecast.day.mintemp_f}
            maxTempc={dailyForecast.day.maxtemp_c}
            minTempc={dailyForecast.day.mintemp_c}
            willRain={dailyForecast.day.daily_will_it_rain}
            icon={dailyForecast.day.condition.icon}
            isCelsius={tempUnit.isCelsius}
            isMetric={units.isMetric}
          />
        ))}
      </div>
    </div >
  );
}

export default App;
