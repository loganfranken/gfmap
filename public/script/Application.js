import BusinessList from './BusinessList.js';
import BusinessMap from './BusinessMap.js';
import React from 'react';

export default class extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            lat: null,
            lon: null,
            businesses: []
        }
    }

    async componentDidMount()
    {
        const position = await this.getCurrentPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`/api/businesses/?lat=${lat}&lon=${lon}`);
        const businesses = await response.json();

        this.setState({ lat, lon, businesses });
    }

    // Source: https://whatwebcando.today/articles/use-geolocation-api-promises/
    getCurrentPosition()
    {
        return new Promise((resolve, reject) => 
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );
    }

    render()
    {
        return (
            <React.Fragment>
                <BusinessMap businesses={this.state.businesses} lat={this.state.lat} lon={this.state.lon} />
                <BusinessList businesses={this.state.businesses} />
            </React.Fragment>
        )
    }

}