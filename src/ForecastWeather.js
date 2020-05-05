import React, { useEffect, useState } from 'react';

function ForecastWeather(props) {

    let date = new Date(Date.now())
    let dayOfWeek = date.getDay()
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <div className="forecast-component container">
            <p className="text">{days[dayOfWeek + props.day]}</p>
            <img src={props.icon} alt="" />
            <p>{props.condition}</p>
            <div className="row">
                <div className="col-6 forecastWeather">
                    <p><i class="fas fa-temperature-high"></i> {props.isCelsius ? props.maxTempc + "°c" : props.maxTempF + "°f"}</p>
                    <p><i class="fas fa-temperature-low"></i> {props.isCelsius ? props.minTempc + "°c" : props.minTempF + "°f"}</p>
                    <p><i class="fas fa-tint"></i>{props.willRain == 0 ? " unlikely" : " possible"}</p>

                </div>
                <div className="col-6 forecastWeather">
                    <p><i class="fas fa-sun"></i> {props.sunrise}</p>
                    <p><i class="fas fa-moon"></i> {props.sunset}</p>
                    <p><i class="fas fa-wind"></i> {props.isMetric ? props.windKph + "kph" : props.windMph + "mph"}</p>
                </div>
            </div>



        </div>
    );
}

export default ForecastWeather;

