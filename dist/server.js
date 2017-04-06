var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs')


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// serve all files in directory
app.use(express.static(path.join(__dirname)))

// app.use('/favicon.ico', function(req, res) {
//   res.sendFile(path.join(__dirname + '/favicon.ico'))
// })

app.listen(8080);
console.log("Serving ./dist/index.html at http://localhost:8080")
