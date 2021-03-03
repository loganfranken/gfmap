import config from './config.js';
import Koa from 'koa';
import serve from 'koa-static';
import Router from '@koa/router';
import yelp from 'yelp-fusion';

const app = new Koa();
const router = new Router();
const yelpClient = yelp.client(config.apiKey);

router.get('/api/businesses/', async (ctx) => {

  const lat = ctx.request.query.lat;
  const lon = ctx.request.query.lon;

  if(!isValidCoordinate(lat) || !isValidCoordinate(lon))
  {
    ctx.status = 400;
    ctx.body = "Invalid coordinates";
    return;
  }

  const response = await yelpClient.search({
    term: 'gluten free',
    latitude: lat,
    longitude: lon
  });

  ctx.body = response.jsonBody.businesses.map(business => ({
    name: business.name,
    coordinates: {
      latitude: business.coordinates.latitude,
      longitude: business.coordinates.longitude
    }
  }));

});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve('./public'));

app.listen(config.port);

function isValidCoordinate(input)
{
  return input && input.match(/^-?[0-9]{1,3}\.[0-9]*$/g);
}