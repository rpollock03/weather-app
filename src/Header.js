import React from "react"


function Header(props) {

    let date = new Date(Date.now())
    let hour = date.getHours()
    let month = date.getMonth()
    let minute = date.getMinutes()
    let dayOfWeek = date.getDay()
    let dayOfMonth = date.getDate()

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let suffix = ""
    if (dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) suffix = "st"
    else if (dayOfMonth == 2 || dayOfMonth == 22) suffix = "nd"
    else if (dayOfMonth == 3 || dayOfMonth == 23) suffix = "rd"
    else suffix = "th"
    let prefix = ""
    if (minute < 10) prefix = "0"

    return (
        <div className="title">
            <h3 style={{ cursor: "pointer" }}><i onClick={props.updateLocation} class="fas fa-map-marker-alt"></i> {props.locationName}, {props.locationRegion}</h3>
            <h5 id="date-time">{days[dayOfWeek]}, {months[month]} {dayOfMonth}{suffix}  ,
        at {hour > 12 ? hour % 12 + ":" + minute + "pm" : hour + ":" + prefix + minute + "am"} </h5>
        </div>
    )
}

export default Header