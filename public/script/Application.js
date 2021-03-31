import BusinessList from './BusinessList.js';
import BusinessMap from './BusinessMap.js';
import LocationSearchControl from './LocationSearchControl.js';
import React from 'react';

export default class extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            lat: null,
            lon: null,
            businesses: [],
            locationQuery: null
        }

        this.handleOnLocationSearchControlSubmit = this.handleOnLocationSearchControlSubmit.bind(this);
        this.handleOnLocationQueryChange = this.handleOnLocationQueryChange.bind(this);
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

    handleOnLocationQueryChange(query)
    {
        this.setState({ locationQuery: query })
    }

    async handleOnLocationSearchControlSubmit()
    {
        const response = await fetch(`/api/businesses/?location=${encodeURIComponent(this.state.locationQuery)}`);
        const businesses = await response.json();
        this.setState({ businesses });
    }

    render()
    {
        return (
            <React.Fragment>
                <LocationSearchControl query={this.state.locationQuery}
                    onQueryChange={this.handleOnLocationQueryChange}
                    onSubmit={this.handleOnLocationSearchControlSubmit} />
                <BusinessMap businesses={this.state.businesses} lat={this.state.lat} lon={this.state.lon} />
                <BusinessList businesses={this.state.businesses} />
            </React.Fragment>
        )
    }

}