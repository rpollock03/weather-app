import React from "react"

import WeatherIcon from "./WeatherIcon"

import "./Forecast.css"


function Forecast(props) {





    return (
        <div className="card rounded my-3 forecast-boxes row">
            <div className="col-4 bg-dark card shadow mx-auto forecast-icon ">
                <WeatherIcon icon={props.icon} />
            </div>
            <div className="col-8">
                <p>{props.weather}</p>
            </div>
        </div>

    )
}




export default Forecast