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


    function getMonth(date) {
        let month = date.getMonth()
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let value = months[month]
        return (value)
    }



    //sunset date/time
    let sunsetDate = new Date(props.sunset * 1000)
    let sunsetHour = sunsetDate.getHours()
    let sunsetMinute = sunsetDate.getMinutes()
    //sunrise date/time
    let sunriseDate = new Date(props.sunrise * 1000)
    let sunriseHour = sunriseDate.getHours()
    let sunriseMinute = sunriseDate.getMinutes()

    //last refresh
    let lastUpdate = new Date(props.dateTime * 1000);



    let isDay;

    if (hourOfDay <= sunsetHour && hourOfDay >= sunriseHour) { isDay = true }
    else isDay = false;

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


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

    function getTemp(tempc) {
        if (props.isMetric) {
            return Math.round(tempc) + "°c"
        } else {
            let tempf = Math.round(tempc * 1.8 + 32) + "°f"
            return tempf
        }
    }


    return (
        <div className="card rounded my-3 shadow-lg current-card">
            <div className="card-top text-center">
                <div className="day-date my-3">
                    <p>{days[dayOfWeek]}, {getMonth(date)} {dayOfMonth}{suffix}</p>
                    <span>...</span>
                </div>
                <LeafletMap id="leaflet-map" lat={props.lat} lon={props.lon} />
            </div>
            <div className="card-body">

                <div className="card-mid row">
                    <div className="col-4 temp text-center">
                        <span>
                            {getTemp(props.temp)}
                        </span>
                        <p className="highAndLow"><i className="fas fa-thermometer-three-quarters" id="red-icon"></i>H: {getTemp(props.max)}   |    <i className="fas fa-thermometer-empty" id="blue-icon"></i>L: {getTemp(props.min)}</p>

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
                    <div className="col-4 lower-weather">
                        <p><i className="fas fa-tint"></i>   Humidity: {props.humidity}%</p>
                        <p><i className="fas fa-cloud"></i> Cloud: 28%</p>
                        <p><i className="fas fa-umbrella"></i> Rain Today: {props.rain ? "yes" : "no"}</p>
                    </div>
                    <div className="col-4 text-center">
                        {isDay ?
                            (<p className="sun-moon"><i className="fas fa-moon"></i> Sunset: {sunsetHour % 12}:{sunsetMinute}pm</p>)
                            :
                            (<p className="sun-moon"><i className="fas fa-sun"></i> Sunrise: {sunriseHour % 12}:{sunriseMinute}am</p>)
                        }
                    </div>
                    <div className="col-4 text-center">

                        <span><i className="fas fa-wind"></i> {props.isMetric ? Math.round(props.windSpeed) + " m/s" : Math.round(props.windSpeed * 1.94384) + " knots"}</span>
                        <p className="mt-3">Blowing {windDirection}</p>
                    </div>

                </div>






            </div>
            <div className="text-center mt-2 settings">
                <span onClick={props.changeUnit}><i className="fas fa-cog"></i> {props.isMetric ? "Imperial" : "Metric"}</span><br />
                <span onClick={props.refresh}><i class="fas fa-sync-alt"></i> last updated: {lastUpdate.getHours()}:{lastUpdate.getMinutes()}</span>
            </div>
        </div>
    )


}



export default Current



