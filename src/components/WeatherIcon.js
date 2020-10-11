import React from "react"

import day_rain from "../icons/day_rain.svg"
//import day_sleet from "../icons/day_sleet.svg"
//import day_snow from "../icons/day_snow.svg"
//import day_rain_thunder from "../icons/day_rain_thunder.svg"
//import day_snow_thunder from "../icons/day_snow_thunder.svg"
import day_partial_cloud from "../icons/day_partial_cloud.svg"
import day_clear from "../icons/day_clear.svg"

import night_clear from "../icons/night_clear.svg"
import night_partial_cloud from "../icons/night_partial_cloud.svg"
import night_rain from "../icons/night_rain.svg"
//import night_rain_thunder from "../icons/night_rain_thunder.svg"
//import night_sleet from "../icons/night_sleet.svg"
//import night_snow from "../icons/night_snow.svg"
//import night_snow_thunder from "../icons/night_snow_thunder.svg"

//import snow_thunder from "../icons/snow_thunder.svg"
import rain from "../icons/rain.svg"
import rain_thunder from "../icons/rain_thunder.svg"
import sleet from "../icons/sleet.svg"
import snow from "../icons/snow.svg"
import thunder from "../icons/thunder.svg"
import fog from "../icons/fog.svg"
//import mist from "../icons/mist.svg"
//import wind from "../icons/wind.svg"
//import overcast from "../icons/overcast.svg"
import cloudy from "../icons/cloudy.svg"
import tornado from "../icons/tornado.svg"

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
    let thunderStormList = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
    let lightRainList = [300, 301, 310, 311, 313, 315, 500, 501, 520, 521]
    let heavyRainList = [302, 312, 314, 502, 503, 504, 531, 522]
    let snowList = [511, 600, 601, 602, 620, 621, 622]
    let sleetList = [611, 612, 613, 615, 616]
    let atmosphereList = [701, 711, 721, 731, 741, 751, 761, 762, 771]
    let tornadoList = 781
    let clearList = 800
    let lightCloudList = [801, 802, 803]
    let cloudList = 804

    // if during the day
    if (currentHour >= sunriseHour && currentHour < sunsetHour) {
        if (thunderStormList.includes(iconCode)) icon = rain_thunder;
        if (lightRainList.includes(iconCode)) icon = day_rain;
        if (heavyRainList.includes(iconCode)) icon = rain;
        if (snowList.includes(iconCode)) icon = snow;
        if (sleetList.includes(iconCode)) icon = sleet;
        if (atmosphereList.includes(iconCode)) icon = fog;
        if (iconCode === tornadoList) icon = tornado;
        if (iconCode === clearList) icon = day_clear;
        if (lightCloudList.includes(iconCode)) icon = day_partial_cloud;
        if (cloudList === iconCode) icon = cloudy;
    }
    //if at night
    else if (currentHour < sunriseHour && currentHour >= sunsetHour) {
        if (thunderStormList.includes(iconCode)) icon = rain_thunder;
        if (lightRainList.includes(iconCode)) icon = night_rain;
        if (heavyRainList.includes(iconCode)) icon = rain;
        if (snowList.includes(iconCode)) icon = snow;
        if (sleetList.includes(iconCode)) icon = sleet;
        if (atmosphereList.includes(iconCode)) icon = fog;
        if (iconCode === tornadoList) icon = tornado;
        if (iconCode === clearList) icon = night_clear;
        if (lightCloudList.includes(iconCode)) icon = night_partial_cloud;
        if (cloudList === iconCode) icon = cloudy
    }

    // if no date time provided, then props coming from forecast component so we dont want day/night symbols
    else {
        if (thunderStormList.includes(iconCode)) icon = thunder;
        if (lightRainList.includes(iconCode)) icon = rain;
        if (heavyRainList.includes(iconCode)) icon = rain;
        if (snowList.includes(iconCode)) icon = snow;
        if (sleetList.includes(iconCode)) icon = sleet;
        if (atmosphereList.includes(iconCode)) icon = fog;
        if (iconCode === tornadoList) icon = tornado;
        if (iconCode === clearList) icon = day_clear;
        if (lightCloudList.includes(iconCode)) icon = cloudy;
        if (cloudList === iconCode) icon = cloudy
    }


    return (
        <img src={icon} alt="weather icon" />
    )

}


export default WeatherIcon