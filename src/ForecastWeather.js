import React, { useEffect, useState } from 'react';

function ForecastWeather(props) {

    let date = new Date(Date.now())
    let dayOfWeek = date.getDay()
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <div className="forecast-component">
            <div className="top-forecast">
                <p className="text forecast-title">{days[dayOfWeek + props.day]}</p>
                <img src={props.icon} alt="" />
                <p className="forecast-condition" >{props.condition}</p>
            </div>
            <div className="bottom-forecast row">
                <div className="col-6 left-forecast">
                    <p><i class="fas fa-temperature-high high-temp"></i> {props.isCelsius ? props.maxTempc + "°c" : props.maxTempF + "°f"}</p>
                    <p><i class="fas fa-temperature-low low-temp"></i> {props.isCelsius ? props.minTempc + "°c" : props.minTempF + "°f"}</p>
                    <p><i class="fas fa-tint rain"></i>{props.willRain == 0 ? " no" : " yes"}</p>
                </div>
                <div className="col-6 right-forecast">
                    <p><i class="fas fa-sun sun"></i> {props.sunrise}</p>
                    <p><i class="fas fa-moon moon"></i> {props.sunset}</p>
                    <p><i class="fas fa-wind wind"></i> {props.isMetric ? props.windKph + "kph" : props.windMph + "mph"}</p>
                </div>
            </div>

        </div>
    );
}

export default ForecastWeather;

