import React, { useRef, useEffect } from "react"
import "./Map.css"


function Map(props) {

    const mapRef = useRef();

    useEffect(() => {

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: props.lat, lng: props.lon },
            zoom: props.zoom,
            disableDefaultUI: true
        })

        const marker = new window.google.maps.Marker({
            position: { lat: props.lat, lng: props.lon },
            map: map
        });

    }, [props.lat, props.lon, props.zoom])


    return (<div ref={mapRef} id="map" style={{ width: 150, height: 150, borderRadius: "50%" }} />);
};

export default Map;
