const express = require('express');
const bodyParser = require('body-parser');
const CommitProvider = require('../src/commitDataProvider');
const CommitFetcher = require('../src/commitFetcher');
const yml = require('js-yaml');
const fs = require('fs');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/lib'));

	app.post('/commits', function(req, res) {
		let config = {
			regexp: /\|([\w]*)(?:\/)?([\w]*)\|/gi,
			excludedPairs: []
		};
		try {
			config = yml.safeLoad(fs.readFileSync('config.yml', 'utf8'))
		} catch (e) {
			console.log(e.message)
			console.log("Using default regexp - |story#|Pair1/Pair2| message");
		}
		const weeks = req.body.weeks;
		const commitFetcher = new CommitFetcher(weeks);
		const commitProvider = new CommitProvider(commitFetcher, config.regexp, config.excludedPairs);
		const commitData = commitProvider.provideData();
		console.log(commitData);
		res.send(commitData);
	})
};
