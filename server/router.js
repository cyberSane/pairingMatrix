var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var CommitProvider = require('../src/commitDataProvider');
var CommitFetcher = require('../src/commitFetcher');
var yml = require('js-yaml');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/lib'))

app.post('/commits', function(req, res) {
	var config = {regexp: /\|([\w]*)(?:\/)?([\w]*)\|/gi};
	try {
		config = yml.safeLoad(fs.readFileSync('/config.yml', 'utf8'))
	} catch (e) {
		console.log(e.message)
		console.log("Using default regexp - |story#|Pair1/Pair2| message");
	}
	var weeks = req.body.weeks;
	var commitFetcher = new CommitFetcher(weeks);
	var commitProvider = new CommitProvider(commitFetcher, config.regexp);
	var commitData = commitProvider.provideData();
	res.send(commitData);
})

module.exports = app;