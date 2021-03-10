import React from 'react';
import ReactDOM from 'react-dom';
import { Loader } from '@googlemaps/js-api-loader';

const name = "Test";

// BusinessMap
const BusinessMap = () => <div id="map"></div>

// BusinessList
const BusinessList = ({ businesses }) => <ul id="list">
    {businesses.map(({ name }) => <li>{name}</li>)}
</ul>

// Application
class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            businesses: [
                { name: 'First Business' },
                { name: 'Second Business' }
            ]
        }
    }

    componentDidMount() {
        this.loadGoogleMaps();
    }

    loadGoogleMaps() {
        const loader = new Loader({
            apiKey: "AIzaSyAvGd5mrygdI4dFek2OuAaGbQECG3HQyec",
            version: "weekly",
        });

        loader.load().then(() => {
            new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <BusinessMap />
                <BusinessList businesses={this.state.businesses} />
            </React.Fragment>
        )
    }

}

ReactDOM.render(
    <Application />,
    document.getElementById('root')
)

// Source: https://whatwebcando.today/articles/use-geolocation-api-promises/
function getCurrentPosition()
{
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}

/*
async function initMap()
{
    const position = await getCurrentPosition();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(`/api/businesses/?lat=${lat}&lon=${lon}`);
    const businesses = await response.json();

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng: lon },
        zoom: 15,
    });

    businesses.forEach((business) => {

        // Add to map
        new google.maps.Marker({
            position: { lat: business.coordinates.latitude, lng: business.coordinates.longitude },
            map
        });

        // Add to list
        document.getElementById('list').innerHTML += `<li>${business.name}</li>`;

    });
}
*/