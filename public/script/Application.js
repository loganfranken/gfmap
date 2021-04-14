import BusinessList from './BusinessList.js';
import BusinessMap from './BusinessMap.js';
import LocationSearchControl from './LocationSearchControl.js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Source: https://whatwebcando.today/articles/use-geolocation-api-promises/
const getCurrentPosition = () => {
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}

export default () => {

    const searchLocation = useSelector(state => state.searchLocation);
    const businesses = useSelector(state => state.businesses);
    const dispatch = useDispatch();

    useEffect(async () => {

        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`/api/businesses/?lat=${lat}&lon=${lon}`);
        const businesses = await response.json();
        
        dispatch({ type: 'searchLocation/coordinatesChanged', payload: { lat, lon } });
        dispatch({ type: 'businesses/changed', payload: businesses });

    }, []);

    async function handleOnLocationSearchControlSubmit()
    {
        const response = await fetch(`/api/businesses/?location=${encodeURIComponent(this.state.locationQuery)}`);
        const businesses = await response.json();
        setBusinesses(businesses);
    }

    return <React.Fragment>
        <LocationSearchControl query={searchLocation.locationQuery}
            onQueryChange={(query) => { setLocationQuery(query) }}
            onSubmit={handleOnLocationSearchControlSubmit} />
        <BusinessMap businesses={businesses} lat={searchLocation.lat} lon={searchLocation.lon} />
        <BusinessList businesses={businesses} />
    </React.Fragment>

}