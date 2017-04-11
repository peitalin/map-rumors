


import * as path from 'path'
import * as fs from 'fs'
import * as Express from 'express'
const app = new Express()

import * as React from 'react'
import { renderToString } from 'react-dom/server'
import LandingPage from './components/LandingPage'

// import App from './app'

const indexHtml = ({ body, title }) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="shortcut icon" href="./favicon.ico">
    <link rel="stylesheet" href="./styles.css" type="text/css" media="all" />
    <meta name="theme-color" content="#222" />
    <link rel="manifest" href="./manifest.json" />
    <link rel="apple-touch-icon" sizes="256x256" href="./icon.png" />
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoEtrs7w3fIHSDvbPB7sAUw7tY7bIuAAU&libraries=places"></script>
    <script  src="https://cdn.rawgit.com/GoogleChrome/pwacompat/v1.0.3/pwacompat.min.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  </head>
  <body>
      <div id="root">${body}</div>
      <script type="text/javascript" src="./vendor.js"></script>
      <script type="text/javascript" src="./bundle.js"></script>
  </body>
</html>
  `;
};

// viewed at http://localhost:8080
app.get('/', function(req, res) {
  const appString = renderToString(<LandingPage/>)
  res.send(indexHtml({
    body: appString,
    title: 'Arrow - Server Side'
  }));

  // res.sendFile(path.join(__dirname + '/index.html'));
});

// serve all files in directory
// app.use(express.static(path.join(__dirname)))

// app.use('/favicon.ico', function(req, res) {
//   res.sendFile(path.join(__dirname + '/favicon.ico'))
// })

app.listen(8080);
console.log("Serving ./dist/index.html at http://localhost:8080")
