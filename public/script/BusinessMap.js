import { Loader } from '@googlemaps/js-api-loader';
import React from 'react';

export default class extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        this.initGoogleMaps();
    }

    componentDidUpdate(props)
    {
        if(props.lat === null || props.lon === null)
        {
            return;
        }

        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: props.lat, lng: props.lon },
            zoom: 15,
        });

        props.businesses.forEach((business) => {
    
            new google.maps.Marker({
                position: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
                map
            });
    
        });
    }

    initGoogleMaps()
    {
        const loader = new Loader({
            apiKey: "AIzaSyD6C-hEcMKp9egz5A9PPsZLCbySXzX03Cc",
            version: "weekly",
        });

        return loader.load();
    }

    render()
    {
        return (
            <div id="map"></div>
        )
    }
}