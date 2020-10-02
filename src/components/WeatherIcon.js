import React from "react"


import day_rain from "../icons/day_rain.svg"
import day_sleet from "../icons/day_sleet.svg"
import day_snow from "../icons/day_snow.svg"
import day_rain_thunder from "../icons/day_rain_thunder.svg"
import day_snow_thunder from "../icons/day_snow_thunder.svg"
import day_partial_cloud from "../icons/day_partial_cloud.svg"
import day_clear from "../icons/day_clear.svg"

import night_clear from "../icons/night_clear.svg"
import night_partial_cloud from "../icons/night_partial_cloud.svg"
import night_rain from "../icons/night_rain.svg"
import night_rain_thunder from "../icons/night_rain_thunder.svg"
import night_sleet from "../icons/night_sleet.svg"
import night_snow from "../icons/night_snow.svg"
import night_snow_thunder from "../icons/night_snow_thunder.svg"

import snow_thunder from "../icons/snow_thunder.svg"
import rain from "../icons/rain.svg"
import rain_thunder from "../icons/rain_thunder.svg"
import sleet from "../icons/sleet.svg"
import snow from "../icons/snow.svg"
import thunder from "../icons/thunder.svg"
import fog from "../icons/fog.svg"
import mist from "../icons/mist.svg"
import wind from "../icons/wind.svg"
import overcast from "/icons/overcast.svg"
import cloud from "/icons/cloud.svg"
import tornado from "/icons/tornado.svg"

function WeatherIcon(props) {

    let iconCode = props.icon; //weather id from api
    let icon //icon return value

    //if time is after sunrise, before sunset
    let currentdate = new Date(Date.now())
    // times 1000 so in milliseconds
    let sunrise = new Date(props.sunrise * 1000)
    let sunset = new Date(props.sunset * 1000)

    let currentHour = currentdate.getHours()
    let sunriseHour = sunrise.getHours()
    let sunsetHour = sunset.getHours()

    //icon codes
    let thunderStorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
    let lightRain = [300, 301, 310, 311, 313, 315, 500, 501, 520, 521]
    let heavyRain = [302, 312, 314, 502, 503, 504, 531, 522]
    let snow = [511, 600, 601, 602, 620, 621, 622]
    let sleet = [611, 612, 613, 615, 616]
    let atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771]
    let tornado = 781
    let clear = 800
    let lightCloud = [801, 802, 803]
    let cloud = 804

    // if during the day
    if (currentHour > sunriseHour && currentHour < sunsetHour) {



        icon = day_rain
    }
    //if at night
    else icon = night_rain




    return (
        <img src={icon} alt="weather icon" />
    )

}


export default WeatherIcon