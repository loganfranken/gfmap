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

// Source: https://whatwebcando.today/articles/use-geolocation-api-promises/
function getCurrentPosition()
{
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}