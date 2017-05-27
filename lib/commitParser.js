var _ = require('lodash');

function CommitsParser(regex) {
	this.regex = regex;
}

CommitsParser.prototype.parse = function(messages) {
	var pairs = this.getPairs(messages);
	return {
		indivisuals: getIndivisuals(pairs),
		validPairs: parseCommitPairsWithTotalCommits(pairs),
		committers: getAllCommitters(pairs)
	}
}

CommitsParser.prototype.getPairs =  function(messages) {
	var pairs = messages.map(extractString.bind(null,this.regex)).filter(Boolean);
	return pairs.map(function(pair) {
		return pair.split('/');
	});
}

function parseCommitPairsWithTotalCommits(pairs) {
	var pairs = validPairs(pairs);
	return getCommittersWithCommits(pairs);
}

function extractString(regex, msg) {
	var match = msg.match(regex);
	return (match) ? match[0].substring(1, match[0].length -1) : match;
}

function getIndivisuals(pairs) {
	var indivisuals = pairs.filter(function(pair) {return pair.length == 1})
	return getCommittersWithCommits(indivisuals);
}

function validPairs(pairs) {
	return pairs.filter(function(pair) {
		return pair.length == 2;
	})
}

function getAllCommitters(pairs) {
	return _.uniq(_.flatten(pairs));
}

function getCommittersWithCommits(pairs) {
	var pairingData = {};
	pairs.forEach(function(pair) {
		if(pairingData[JSON.stringify(pair)])
			pairingData[JSON.stringify(pair)]++;
		else 
			pairingData[JSON.stringify(pair)] = 1;
	})
	return Object.keys(pairingData).map(function(pair) {
		return {pair: JSON.parse(pair), commits: pairingData[pair]};
	});	
}


module.exports = CommitsParser;