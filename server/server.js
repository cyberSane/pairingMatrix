#!/usr/bin/env node
var express = require('express');

var app = express();
var CommitProvider = require('../src/commitDataProvider');
var CommitFetcher = require('../src/commitFetcher');

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/lib'))
app.listen(3000, function() {console.log('listening at 3000..')})

app.get('/commits', function(req, res) {
	var commitFetcher = new CommitFetcher();
	var regexp = /\|\w*\/\w*\||\|\w*\|/gi;
	var commitProvider = new CommitProvider(commitFetcher, regexp);
	var commitData = commitProvider.provideData();
	res.send(commitData);
})
