import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Map = styled.div`
    height: 300px;
    width: 100%;
`

const loader = new Loader({
    apiKey: "AIzaSyD6C-hEcMKp9egz5A9PPsZLCbySXzX03Cc",
    version: "weekly",
});

var map = null;
var markers = [];

const updateMap = (businesses, lat, lon) => {

    if(map === null)
    {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: lon },
            zoom: 15,
        });
    }
    else
    {
        // Set the center of the map
        map.setCenter(new google.maps.LatLng(lat, lon));
    }

    // Erase all of the current markers
    markers.forEach(marker => { marker.setMap(null); });

    // Add markers for all of the businesses
    markers = businesses.map(business => new google.maps.Marker({
        position: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
        map
    }));
}

export default ({ businesses, lat, lon }) => {

    useEffect(() => {
        if(lat === null || lon === null)
        {
            return;
        }

        // Do we need to initialize the map?
        if(!loader.done)
        {
            loader.load().then(() => { updateMap(businesses, lat, lon) });
            return;
        }

        updateMap(businesses, lat, lon);

    }, [businesses]);

    return <Map id="map"></Map>
}