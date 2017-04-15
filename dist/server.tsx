

import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { getDataFromTree } from "react-apollo"
import { match, RouterContext } from 'react-router';
import Express from 'express';


// import { createServer } from 'http'
// import * as React from 'react'
// import * as ReactDOMServer from 'react-dom/server'
// import { StaticRouter } from 'react-router'
//
// const path = require('path')
// const http = require('http')
// const fs = require('fs')
// const express = require('express')
//
//
// import AppRoutes from '../src/AppRoutes'
// // import LandingPage from '../src/components/LandingPage'
//
// const index = fs.readFileSync('./dist/index.html', 'utf8')
// // console.info(index)
// const PORT = process.env.PORT || 8000



import AppRoutes from '../src/AppRoutes'
const app = new Express();

app.use((req, res) => {

  // This example uses React Router, although it should work equally well with other
  // routers that support SSR
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {

    const client = new ApolloClient({
      ssrMode: true,
      // Remember that this is the interface the SSR server will use to connect to the
      // API server, so we need to ensure it isn't firewalled, etc
      networkInterface: createNetworkInterface({
        uri: 'http://localhost:7777',
        opts: {
          credentials: 'same-origin',
          // transfer request headers to networkInterface so that they're accessible to proxy server
          // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
          headers: req.headers,
        },
      }),
    });

    const app = (
      <ApolloProvider client={client}>
        <AppRoutes {...renderProps} />
      </ApolloProvider>
    );

    // rendering code (see below)
  });
});

app.listen(basePort, () => console.log( // eslint-disable-line no-console
  `App Server is now running on http://localhost:${basePort}`
));















// // Create HTTP server
// const app = express()
// const server = new http.Server(app)
//
// // Serve static files
// app.use(express.static(path.join(__dirname)))
//
// // Serve everything else through react-router
// app.use((req, res) => {
//   const html = ReactDOMServer.renderToString( <AppRoutes/> )
//   // const html = ReactDOMServer.renderToString( <LandingPage/> )
//
//   res.write(index.replace(
//     /<div id="root"><\/div>/,
//     `<div id="root">${html}</div>`
//   ));
//   res.end()
// })
//
// // Serve everything else through react-router
// app.use((req, res) => {
//   const context = {}
//
//   const html = ReactDOMServer.renderToString(
//     <StaticRouter location={req.url} context={context}>
//       <AppRoutes/>
//     </StaticRouter>
//   )
//
//   if (context.url) {
//     res.writeHead(301, {Location: context.url})
//     res.end()
//   } else {
//     res.write(index.replace(
//       /<div id="root"><\/div>/,
//       `<div id="root">${html}</div>`
//     ));
//     res.end()
//   }
// })
//
// // Listen incoming HTTP requests
// server.listen(PORT)
// console.log(`\nApplication available at http://localhost:${PORT}\n`)


// var express = require('express');
// var app = express();
// var path = require('path');
// var fs = require('fs')
//
//
// // viewed at http://localhost:8080
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });
//
// // serve all files in directory
// app.use(express.static(path.join(__dirname)))
//
// // app.use('/favicon.ico', function(req, res) {
// //   res.sendFile(path.join(__dirname + '/favicon.ico'))
// // })
//
// app.listen(8080);
// console.log("Serving ./dist/index.html at http://localhost:8080")
