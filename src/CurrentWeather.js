import React, { useEffect, useState } from 'react';


function CurrentWeather(props) {



    return (
        <div className="current-weather">
            <div className="d-flex flex-row justify-content-center">
                <div className="col-4">
                    <h1 style={{ cursor: "pointer", fontSize: "4rem" }} onClick={props.changeTempUnit}>{props.isCelsius ? props.tempc + "°c" : props.tempf + "°f"}</h1>
                </div>
                <div className="col-4" id="current-weather-left">
                    <img className="current-weather-icon" src={props.icon} alt="" />

                </div>
                <div className="col-4" id="current-weather-right">
                    <h2>{props.condition}</h2>
                    <p style={{ cursor: "pointer" }} onClick={props.changeUnit}><i class="fas fa-wind"></i> {props.isMetric ? props.windKph + "kph" : props.windMph + "mph"} {props.windDir}.</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;

