import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Map = styled.div`
    height: 300px;
    width: 100%;
`

var map = null;
var markers = [];
var infoWindows = [];

const loader = new Loader({
    apiKey: "AIzaSyD6C-hEcMKp9egz5A9PPsZLCbySXzX03Cc",
    version: "weekly",
});

const setUpInfoWindow = (marker, business) => {
    const infoWindow = new google.maps.InfoWindow();

    marker.addListener('click', () => {
        infoWindow.setContent(`<a class="google-maps-link" href="${business.url}">${business.name}</a>`);
        infoWindows.forEach((infoWindow) => { infoWindow.close(); });
        infoWindow.open(map, marker);
    });

    infoWindows.push(infoWindow);
};

const clearMap = () => {
    markers.forEach(marker => { marker.setMap(null); });
    infoWindows = [];
}

const updateMap = (businesses, lat, lon) => {

    if(map === null)
    {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: lon },
            zoom: 14,
        });
    }
    else
    {
        // Set the center of the map
        map.setCenter(new google.maps.LatLng(lat, lon));
    }

    // Erase all of the current markers
    clearMap();

    // Add a marker for the center
    markers.push(new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map,
        icon: {
            url: '/images/center_marker.png'
        }
    }));

    // Add markers for all of the businesses
    businesses.forEach(business => {

        const marker = new google.maps.Marker({
            position: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
            title: business.name,
            map
        });

        markers.push(marker);
        setUpInfoWindow(marker, business);

    });
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