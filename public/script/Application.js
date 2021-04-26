import BusinessList from './BusinessList.js';
import BusinessMap from './BusinessMap.js';
import LocationSearchControl from './LocationSearchControl.js';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const DefaultTheme = {
    backgroundColor: '#C73F12'
}

const HeaderWrapper = styled.div`
    background: ${props => props?.theme?.backgroundColor};
    width: 100%;
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 720px;
`

const Title = styled.h1`
    color: #FFF;
    font-size: 1.3em;
    margin: 0;
    padding: 0.75em;
    padding-bottom: 0;
`

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
        const data = await response.json();
        
        dispatch({ type: 'searchLocation/coordinatesChanged', payload: { lat: data.location.latitude, lon: data.location.longitude } });
        dispatch({ type: 'businesses/changed', payload: data.businesses });

    }, []);

    async function handleOnLocationSearchControlSubmit()
    {
        const response = await fetch(`/api/businesses/?location=${encodeURIComponent(searchLocation.locationQuery)}`);
        const data = await response.json();
        
        dispatch({ type: 'searchLocation/coordinatesChanged', payload: { lat: data.location.latitude, lon: data.location.longitude } });
        dispatch({ type: 'businesses/changed', payload: data.businesses });
    }

    return <ThemeProvider theme={DefaultTheme}>
        <HeaderWrapper>
            <Header>
                <Title>GFMap</Title>
                <LocationSearchControl query={searchLocation.locationQuery}
                    onQueryChange={(query) => { dispatch({ type: 'searchLocation/queryChanged', payload: query }); }}
                    onSubmit={handleOnLocationSearchControlSubmit} />
            </Header>
        </HeaderWrapper>
        <BusinessMap businesses={businesses} lat={searchLocation.lat} lon={searchLocation.lon} />
        <BusinessList businesses={businesses} />
    </ThemeProvider>

}