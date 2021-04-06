import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';

const loader = new Loader({
    apiKey: "AIzaSyD6C-hEcMKp9egz5A9PPsZLCbySXzX03Cc",
    version: "weekly",
});

export default ({ businesses, lat, lon }) => {
    
    useEffect(() => {

        if(lat === null || lon === null)
        {
            return;
        }

        loader.load().then(() => {
    
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: lat, lng: lon },
                zoom: 15,
            });
    
            this.props.businesses.forEach((business) => {
        
                new google.maps.Marker({
                    position: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
                    map
                });
        
            });
        });

    });

    return <div id="map">
        <ul id="list">
            {businesses.map(({ name }) => <li>{name}</li>)}
        </ul>
    </div>
}