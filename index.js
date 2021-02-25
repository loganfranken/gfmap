import config from './config.js';
import Koa from 'koa';
import yelp from 'yelp-fusion';

const app = new Koa();

app.use(async ctx => {

  const client = yelp.client(config.apiKey);
  const response = await client.search({
    term: 'gluten free',
    latitude: '47.606209',
    longitude: '-122.332069'
  });

  ctx.body = response.jsonBody.businesses[0].name;

});

app.listen(config.port);