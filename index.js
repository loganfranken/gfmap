import config from './config.js';
import yelp from 'yelp-fusion';

const client = yelp.client(config.apiKey);

client.search({
  term: 'gluten free',
  latitude: '47.606209',
  longitude: '-122.332069'
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});