import React from "react";

import weatherLogo from "../icons/day_sleet.svg"
import "./Current.css"

import LeafletMap from "./LeafletMap"
import WeatherIcon from "./WeatherIcon"

function Current(props) {

    return (
        <div className="card rounded my-3 shadow-lg current-card">
            <div className="card-top text-center">
                <div className="day-date my-3">
                    <p>Saturday, March 15th</p>
                    <span>...</span>
                </div>
                <LeafletMap id="leaflet-map" />
            </div>
            <div className="card-body">

                <div className="card-mid row">
                    <div className="col-4 temp text-center">
                        <span>{Math.round(props.temp)}°c</span>
                        <p>High: {Math.round(props.max)}   | Low: {Math.round(props.min)}</p>

                    </div>
                    <div className="col-4 icon-container card shadow mx-auto">
                        <img src={weatherLogo} alt="" />
                    </div>
                    <div className="col-4 text-center">
                        <p className="condition">{props.condition}</p>
                        <hr />
                    </div>

                </div>

                <div className="card-bottom px-5 py-4 row">
                    <div className="col">
                        <p className="high">30°c</p>
                        <p className="low">27°c</p>
                        <p>30deg</p>
                        <span>feels like</span>
                    </div>
                    <div className="col text-center">
                        <p>55deg</p>
                        <span>humidity</span>
                    </div>

                </div>

            </div>

        </div>
    )


}



export default Current



