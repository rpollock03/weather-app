import React, { useEffect, useState } from 'react';


function CurrentWeather(props) {



    return (
        <div className="current-weather">
            <div className="d-flex flex-row">
                <div className="col-6" id="current-weather-left">
                    <img className="current-weather-icon" src={props.icon} alt="" />
                    <h1><i class="fas fa-thermometer-half"></i> {props.isCelsius ? props.tempc + "°c" : props.tempf + "°f"}</h1>
                </div>
                <div className="col-6" id="current-weather-right">
                    <h2>{props.condition}</h2>
                    <p><i class="fas fa-wind"></i> {props.isMetric ? props.windKph + "kph" : props.windMph + "mph"} blowing {props.windDir}.</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;

