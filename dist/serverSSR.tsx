


import * as path from 'path'
import * as fs from 'fs'

import * as React from 'react'
import { renderToString } from 'react-dom/server'
import LandingPageStatic from './LandingPageStatic'

import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as sendFile from 'koa-send'

// var path = require('path');
// var fs = require('fs')
//
// var Koa = require('koa');
// var Router = require('koa-router');
// var serve = require('koa-static');
// var sendFile = require('koa-send')

// import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
// import App from './app'


const indexHtml = ({ body, title, cssStyles }) => {
  const css = `
  <link rel="stylesheet" href="./styles.css" type="text/css" media="all" />
  <link rel="stylesheet" href="./stylesSSR.css" type="text/css" media="all" />
  `

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <meta name="theme-color" content="#222" />
    <styles>${cssStyles}</styles>
    <link rel="stylesheet" href="./styles.css" type="text/css" media="all" />
  </head>
  <body>
    <script>
      var CACHE_NAME = 'pwa-cache-v1';
      var urlsToCache = [
        '/styles.css',
        '/stylesSSR.css',
        '/vendor.js',
        '/manifest.json',
        '/bundle.js',
        '/localforage.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min.js',
      ];
      self.addEventListener('install', (event) => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });
      self.addEventListener('fetch', (event) => {
          const url = new URL(event.request.url)
          event.respondWith(
            caches.match(event.request)
              .then(response => response || fetch(event.request))
          );
      });
    </script>
    <div id="root">${body}</div>
    <!-- Dependencies -->
    <script src="./localforage.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"></script>
    <script type="text/javascript" src="./vendor.js"></script>
    <script async type="text/javascript" src="./bundle.js"></script>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoEtrs7w3fIHSDvbPB7sAUw7tY7bIuAAU&libraries=places"></script>

    <script async src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
    <script async type="text/javascript" src="https://s3-ap-southeast-2.amazonaws.com/greensockfiles/ScrollToPlugin.min.js"></script>
    <script async type="text/javascript" src="https://s3-ap-southeast-2.amazonaws.com/greensockfiles/DrawSVGPlugin.min.js"></script>
    <script async type="text/javascript" src="https://s3-ap-southeast-2.amazonaws.com/greensockfiles/SplitText.min.js"></script>

    <link rel="stylesheet" href="./overrides.css" type="text/css"/>
  </body>
</html>
  `;
};


const koa = new Koa()
const router = new Router()
var PORT = process.env.PORT || 8080;


router.get('/', async(ctx) => {
  const appString = renderToString(<LandingPageStatic/>)
  // const cssString = fs.readFileSync(path.resolve(__dirname, 'dist', 'stylesSSR.css'), 'utf-8')

  ctx.body = indexHtml({
    body: appString,
    title: 'Umbre - Server Side',
    cssStyles: '',
  }));
})

router.get('/', async(ctx) => {
  await sendFile(ctx, '/index.html', { root: 'dist' })
})


koa.use(router.routes());
// serve all files in directory:
koa.use(serve(path.join(__dirname)));

koa.listen(PORT, () => {
  console.log(`Koa serving: ./dist/index.html at http://localhost:${PORT}`)
});


