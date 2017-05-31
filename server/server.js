#!/usr/bin/env node

var http = require('http');
var router = require('./router');
var server = http.createServer(router);

server.listen(3000, (err) => {
    if(err) return console.log('Something went wrong while booting server');
    console.log('listening at 3000..');
});