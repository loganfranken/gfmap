import BusinessList from './BusinessList.js';
import BusinessMap from './BusinessMap.js';
import LocationSearchControl from './LocationSearchControl.js';
import React, { useEffect, useState } from 'react';

// Source: https://whatwebcando.today/articles/use-geolocation-api-promises/
const getCurrentPosition = () => {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}

export default () => {

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [locationQuery, setLocationQuery] = useState(null);

    useEffect(async () => {

        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`/api/businesses/?lat=${lat}&lon=${lon}`);
        const businesses = await response.json();

        setLat(lat);
        setLon(lon);
        setBusinesses(businesses);

    });

    async function handleOnLocationSearchControlSubmit()
    {
        const response = await fetch(`/api/businesses/?location=${encodeURIComponent(this.state.locationQuery)}`);
        const businesses = await response.json();
        setBusinesses(businesses);
    }

    return <React.Fragment>
        <LocationSearchControl query={locationQuery}
            onQueryChange={(query) => { setLocationQuery(query) }}
            onSubmit={handleOnLocationSearchControlSubmit} />
        <BusinessMap businesses={businesses} lat={lat} lon={lon} />
        <BusinessList businesses={businesses} />
    </React.Fragment>

}