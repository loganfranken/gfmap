import config from './config.js';
import Koa from 'koa';
import Router from '@koa/router';
import yelp from 'yelp-fusion';

const app = new Koa();
const router = new Router();
const yelpClient = yelp.client(config.apiKey);

router.get('/api/businesses', async (ctx) => {

  const response = await yelpClient.search({
    term: 'gluten free',
    latitude: '47.606209',
    longitude: '-122.332069'
  });

  ctx.body = response.jsonBody.businesses[0].name;

});

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port);