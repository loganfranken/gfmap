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
  const location = ctx.request.query.location;

  const searchInfo = { term: 'gluten free', radius: 8000 };

  if(typeof location !== 'undefined')
  {
    if(!isValidLocation(location))
    {
      ctx.status = 400;
      ctx.body = "Invalid location";
      return;
    }

    searchInfo.location = location;
  }
  else
  {
    if(!isValidCoordinate(lat) || !isValidCoordinate(lon))
    {
      ctx.status = 400;
      ctx.body = "Invalid coordinates";
      return;
    }

    searchInfo.latitude = lat;
    searchInfo.longitude = lon;
  }

  const response = await yelpClient.search(searchInfo);

  ctx.body = response.jsonBody.businesses.map(business => ({
    id: business.alias,
    name: business.name,
    url: business.url,
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

function isValidLocation(input)
{
  return input !== null && input !== '';
}