import React from 'react';

import { Map, Marker, Popup, TileLayer } from "react-leaflet"

import "./Map.css"

function LeafletMap() {


    const API_KEY = process.env.REACT_APP_WEATHER_KEY
    const position = [51.505, -0.09]

    return (
        < Map


            center={position}
            zoom={4}
            zoomControl={false}
            doubleClickZoom={false}
            closePopupOnClick={false}
            dragging={false}
            zoomSnap={false}
            zoomDelta={false}
            trackResize={false}
            touchZoom={false}
            keyboard={false}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "300px" }}>
            <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer url={"http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=" + API_KEY}

            />
            <Marker position={position}>
                <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
        </Map >)

}

export default LeafletMap;