import React from "react"

import WeatherIcon from "./WeatherIcon"

import "./Forecast.css"


function Forecast(props) {

    let dayOfWeek = ""
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    if (props.day == 0) {
        dayOfWeek = "tomorrow"
    } else {
        let date = new Date(Date.now())
        let currentDay = date.getDay()
        dayOfWeek = days[(currentDay + props.day + 1) % 7]
    }

    function getBeaufortWind(speed) {
        let beaufort = ""
        if (speed < 2) beaufort = "Calm"
        if (speed >= 2 && speed < 5) beaufort = "Light Breeze"
        if (speed >= 5 && speed < 10.5) beaufort = "Moderate Breeze"
        if (speed >= 10.5 && speed < 16.5) beaufort = "Strong Breeze"
        if (speed >= 16.5 && speed < 27.5) beaufort = "Gale"
        if (speed >= 27.5) beaufort = "Stormforce Winds"
        return beaufort;
    }

    function getTemp(tempc) {
        if (props.isMetric) {
            return Math.round(tempc) + "°c"
        } else {
            let tempf = Math.round(tempc * 1.8 + 32) + "°f"
            return tempf
        }
    }

    return (
        <div className="card rounded my-2 forecast-boxes row" id={"forecast" + props.day}>



            <div className="col-4 shadow m-auto forecast-icon text-center p-0 ">
                <WeatherIcon icon={props.icon} />
            </div>
            <div className="col-8 text-center">
                <h3 className="forecast-day">{dayOfWeek}</h3>
                <h5 className="my-1 py-1 font-weight-bold ">{props.weather}</h5>
                <h5 className="my-1 py-1 d-flex justify-content-around"><span><i className="fas fa-thermometer-three-quarters"></i>  {getTemp(props.tempHigh)}</span>|<span><i className="fas fa-thermometer-empty"></i>  {getTemp(props.tempLow)}</span></h5>
                <h5 className="font-italic">{getBeaufortWind(props.windSpeed)} </h5>
            </div>
        </div>

    )
}




export default Forecast