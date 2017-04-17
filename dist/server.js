

var path = require('path');
var fs = require('fs')

var Koa = require('koa');
var Router = require('koa-router');
var serve = require('koa-static');
var send = require('koa-send')
var bodyParser = require('koa-bodyparser')

var koa = new Koa();
var router = new Router()
var PORT = process.env.PORT || 8080;

router.get('/', async(ctx) => {
  await send(ctx, '/index.html', { root: 'dist' })
})

koa.use(router.routes());
koa.use(serve(path.join(__dirname)));

koa.listen(PORT, () => {
  console.log(`Koa serving: ./dist/index.html at http://localhost:${PORT}`)
});

