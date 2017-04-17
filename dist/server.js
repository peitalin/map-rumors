

var path = require('path');
var fs = require('fs')

var Koa = require('koa');
var Router = require('koa-router');
var serve = require('koa-static');
var sendFile = require('koa-send')

var koa = new Koa();
var router = new Router()
var PORT = process.env.PORT || 8080;

router.get('/', async(ctx) => {
  await sendFile(ctx, '/index.html', { root: 'dist' })
})

koa.use(router.routes());
// serve all files in directory:
koa.use(serve(path.join(__dirname)));

koa.listen(PORT, () => {
  console.log(`Koa serving: ./dist/index.html at http://localhost:${PORT}`)
});

