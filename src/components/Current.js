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
                        <p><i class="fas fa-thermometer-three-quarters"></i> High: {Math.round(props.max)}   | <i class="fas fa-thermometer-empty"></i> Low: {Math.round(props.min)}</p>

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
                        <p><i class="fas fa-tint"></i>  Humidity: 4</p>
                        <p><i class="fas fa-cloud"></i> Cloud Cover: 5</p>
                        <p><i class="fas fa-umbrella"></i>  Rain: 22mm</p>
                    </div>
                    <div className="col-4 text-center">
                        {isDay ?
                            (<p><i class="fas fa-moon"></i> Sunset:{sunsetHour % 12}:{sunsetMinute}pm</p>)
                            :
                            (<p><i class="fas fa-sun"></i> Sunrise:{sunriseHour % 12}:{sunriseMinute}am</p>)
                        }
                    </div>
                    <div className="col-4 text-center">
                        <p><i class="fas fa-wind"></i> Wind</p>
                        <span>5 m/s</span>
                        <p>SouthEast</p>
                    </div>

                </div>
                <div className="text-center mt-3">
                    <span><i class="fas fa-cog"></i> kph/mph   C/F</span>
                </div>

            </div>

        </div>
    )


}



export default Current



