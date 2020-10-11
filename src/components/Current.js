import React from "react";

import "./Current.css"

import LeafletMap from "./LeafletMap"
import WeatherIcon from "./WeatherIcon"

function Current(props) {

    //current date/time
    let date = new Date(Date.now()) //can sub contents of brackets for epoch stamp from API
    let monthOfYear = date.getMonth()
    let dayOfWeek = date.getDay()
    let dayOfMonth = date.getDate()
    let hourOfDay = date.getHours()
    let currentMinute = date.getMinutes()

    //sunset date/time
    let sunsetDate = new Date(props.sunset * 1000)
    let sunsetHour = sunsetDate.getHours()
    let sunsetMinute = sunsetDate.getMinutes()
    //sunrise date/time
    let sunriseDate = new Date(props.sunrise * 1000)
    let sunriseHour = sunriseDate.getHours()
    let sunriseMinute = sunriseDate.getMinutes()

    let isDay;

    if (hourOfDay <= sunsetHour && hourOfDay >= sunriseHour) { isDay = true }
    else isDay = false;

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let suffix = ""
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) suffix = "st"
    else if (dayOfMonth === 2 || dayOfMonth === 22) suffix = "nd"
    else if (dayOfMonth === 3 || dayOfMonth === 23) suffix = "rd"
    else suffix = "th"

    let windDirection = ""
    let windDeg = props.windDirection
    if ((windDeg >= 0 && windDeg <= 24) || windDeg >= 336) windDirection = "North"
    if (windDeg >= 25 && windDeg <= 67) windDirection = "North East"
    if (windDeg >= 68 && windDeg <= 112) windDirection = "East"
    if (windDeg >= 113 && windDeg <= 157) windDirection = "South East"
    if (windDeg >= 158 && windDeg <= 202) windDirection = "South"
    if (windDeg >= 203 && windDeg <= 248) windDirection = "South West"
    if (windDeg >= 249 && windDeg <= 294) windDirection = "West"
    if (windDeg >= 295 && windDeg <= 335) windDirection = "North west"



    return (
        <div className="card rounded my-3 shadow-lg current-card">
            <div className="card-top text-center">
                <div className="day-date my-3">
                    <p>{days[dayOfWeek]}, {months[monthOfYear]} {dayOfMonth}{suffix}</p>
                    <span>...</span>
                </div>
                <LeafletMap id="leaflet-map" lat={props.lat} lon={props.lon} />
            </div>
            <div className="card-body">

                <div className="card-mid row">
                    <div className="col-4 temp text-center">
                        <span>{Math.round(props.temp)}°c</span>
                        <p><i className="fas fa-thermometer-three-quarters"></i> High: {Math.round(props.max)}   | <i className="fas fa-thermometer-empty"></i> Low: {Math.round(props.min)}</p>

                    </div>
                    <div className="col-4 icon-container card shadow mx-auto">
                        <WeatherIcon icon={props.icon} sunrise={props.sunrise} sunset={props.sunset} />
                    </div>
                    <div className="col-4 text-center">
                        <p className="condition">{props.condition}</p>
                        <hr />
                    </div>

                </div>

                <div className="card-bottom px-3 pt-4 row">
                    <div className="col-4">
                        <p><i className="fas fa-tint"></i>  Humidity: 4</p>
                        <p><i className="fas fa-cloud"></i> Cloud Cover: 5</p>
                        <p><i className="fas fa-umbrella"></i>  Rain: 22mm</p>
                    </div>
                    <div className="col-4 text-center">
                        {isDay ?
                            (<p><i className="fas fa-moon"></i> Sunset:{sunsetHour % 12}:{sunsetMinute}pm</p>)
                            :
                            (<p><i className="fas fa-sun"></i> Sunrise:{sunriseHour % 12}:{sunriseMinute}am</p>)
                        }
                    </div>
                    <div className="col-4 text-center">

                        <span><i className="fas fa-wind"></i> {props.windSpeed}m/s</span>
                        <p className="mt-2">{windDirection}</p>
                    </div>

                </div>
                <div className="text-center mt-3">
                    <span><i className="fas fa-cog"></i> kph/mph   C/F</span>
                </div>

            </div>

        </div>
    )


}



export default Current



